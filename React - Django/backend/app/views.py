from django.contrib.auth.models import User
from app.models import Product, Profile, Transaction, Wallet
from django.shortcuts import render, get_object_or_404

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from app.permissions import IsManager, IsCashier

from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework import status

from django.contrib.auth.hashers import make_password
from .serializer import ProductSerializer, UserSerializer, ProfileSerializer, CreditWalletSerializer, UserSerializerWithToken

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from django.db import IntegrityError
from decimal import Decimal



@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfiles(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)






                    # Register the new Users

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print("Received data:", data)  # Print the incoming data for debugging
    try:
        user = User.objects.create(
            first_name=data['firstName'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )

        # Get or create Profile instance for the user
        profile, created = Profile.objects.get_or_create(user=user)
        
        # Update Profile fields (phoneNumber and City)
        profile.phoneNumber = data.get('phoneNumber')  # Save phoneNumber if provided
        profile.City = data.get('City')
        profile.save()

        # Create Wallet instance for the user if not already created by the signal
        if not hasattr(profile, 'wallet'):
            wallet = Wallet.objects.create(user=user, balance=0.00)

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except KeyError as e:
        message = {'details': f'Missing required field: {str(e)}'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError:
        message = {'details': 'User with this email or username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        message = {'details': f'Error occurred: {str(e)}'}
        return Response(message, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





            #Credit Wallet of Customer

@api_view(['POST'])
@permission_classes([IsCashier])
def credit_wallet(request):
    serializer = CreditWalletSerializer(data=request.data)
    if serializer.is_valid():
        amount = serializer.validated_data['amount']
        username = serializer.validated_data['username']
        
        user = get_object_or_404(User, username=username)
        wallet = user.profile.wallet  # Assuming user profile has a OneToOneField to Wallet

        initial_balance = wallet.balance
        credit_by_admin = amount
        new_wallet_balance = initial_balance + amount
        
        # Update the wallet balance
        wallet.balance = new_wallet_balance
        wallet.save()

        # Record the transaction
        transaction = Transaction.objects.create(
            user=user,
            initial_wallet_balance=initial_balance,
            credit_by_admin=credit_by_admin,
            new_wallet_balance=new_wallet_balance
        )
        
        return Response({'message': 'Wallet credited successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







@api_view(['POST'])
def debit_wallet(request):
    username = request.data.get('username')
    amount = Decimal(request.data.get('amount'))  # Convert amount to Decimal

    # Retrieve user's wallet
    user = get_object_or_404(User, username=username)
    wallet = user.profile.wallet

    # Debit the wallet
    if wallet.balance >= amount:  # Check if sufficient balance is available
        wallet.balance -= amount
        wallet.save()
        return Response({'message': f'Wallet debited by {amount} successfully'})
    else:
        return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)
