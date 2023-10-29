from django.contrib.auth.models import User
from app.models import Product
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Order  # Import your Order model
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .serializer import ProductSerializer,UserSerializer,OrderSerializer,UserSerializerWithToken



# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')    

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,attrs):
        data=super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
    

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
    
        


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def  getUserProfiles(request):
    user=request.user
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def  getUsers(request):
    user=User.objects.all()
    serializer=UserSerializer(user,many=True)
    return Response(serializer.data)


# register the new users

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    try:
        # Extract the 'wallet_balance' field from the request data
        wallet_balance = data.get('wallet_balance', 0.00)

        # Create the user instance with the 'wallet_balance' field
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        
        # Assign the 'wallet_balance' value to the user profile
        user.userprofile.wallet_balance = wallet_balance
        user.userprofile.save()

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'USER WITH THIS EMAIL ALREADY EXISTS'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    

#  handle the order placement and payment deduction logic

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    payment_amount = request.data.get('payment_amount')  # Extract payment amount from the request data

    # Implement payment deduction logic here
    # Ensure that the user has sufficient funds in their wallet
    # Deduct the payment amount from the user's wallet

    # Create an order record
    order = Order.objects.create(user=user, total_amount=payment_amount)

    # Serialize the order data and return it in the response
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)







