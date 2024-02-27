from django.contrib.auth.models import User
from app.models import Product, Profile, Transaction, Wallet, Order, OrderItem, ShippingAddress
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
from .serializer import ProductSerializer, UserSerializer, ProfileSerializer, CreditWalletSerializer, UserSerializerWithToken, DebitWalletSerializer, TransactionSerializer

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from django.db import IntegrityError
from django.http import JsonResponse
from .serializer import WalletSerializer
from decimal import Decimal
from rest_framework import generics
from datetime import datetime, timedelta
from django.utils import timezone


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
        # Save phoneNumber if provided
        profile.phoneNumber = data.get('phoneNumber')
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

        # Credit Wallet of Customer


@api_view(['POST'])
@permission_classes([IsCashier])
def credit_wallet(request):
    serializer = CreditWalletSerializer(data=request.data)
    if serializer.is_valid():
        amount = serializer.validated_data['amount']
        username = serializer.validated_data['username']

        user = get_object_or_404(User, username=username)
        wallet = user.profile.wallet

        previous_balance = wallet.balance

        new_balance = previous_balance + amount

        # Update the wallet balance
        wallet.balance = new_balance
        wallet.save()

        # Extract the username of the person making the request
        requester_username = request.user.username if request.user else 'Anonymous User'

        # Record the transaction
        description = f"Admin credited your wallet with ${amount}"
        details = f"{requester_username} credited the wallet of {user.username} by ${amount}"
        type = f"credit"
        transaction = Transaction.objects.create(
            user=user,
            description=description,
            details=details,
            amount=amount,
            previous_balance=previous_balance,
            new_balance=new_balance,
            type=type
        )

        return Response({'message': 'Wallet credited successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # admin debit User's wallet  Manually


@api_view(['POST'])
@permission_classes([IsCashier])
def debit_wallet(request):
    serializer = DebitWalletSerializer(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        username = validated_data.get('username')
        amount = validated_data.get('amount')

        # Retrieve user's wallet
        user = get_object_or_404(User, username=username)
        wallet = user.profile.wallet

        if wallet.balance >= amount:
            previous_balance = wallet.balance

            # Debit the wallet
            wallet.balance -= amount
            wallet.save()

            new_balance = wallet.balance

            # Extract the username of the person making the request
            requester_username = request.user.username if request.user else 'Anonymous User'

            # Record the transaction
            description = f"Admin debited your wallet by ${amount}"
            details = f"{requester_username} debited the wallet of {user.username} by ${amount}"
            type = f"debit"
            transaction = Transaction.objects.create(
                user=user,
                description=description,
                details=details,  # Include the additional details
                amount=amount,
                previous_balance=previous_balance,
                new_balance=new_balance,
                type=type
            )

            # Formulate the success message including amount, previous balance, and new balance
            success_message = (
                f'Wallet debited successfully by ${amount}\n'
                f'Previous balance: ${previous_balance}\n'
                f'New balance: ${new_balance}'
            )

            return Response({'message': success_message})
        else:
            return Response({'error': 'Insufficient balance'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wallet_balance(request):
    # Get the user from the request
    user = request.user

    try:
        # Assuming each user has only one wallet, you can adjust as needed
        wallet = Wallet.objects.get(user=user.profile.user)
        balance = wallet.balance

        return Response({'balance': balance})
    except Wallet.DoesNotExist:
        return Response({'error': 'Wallet not found for this user'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_purchase(request):
    user = request.user

    # Fetch the user's wallet
    wallet = Wallet.objects.get(user=user)

    # Assuming totalAmount and orderItems are passed in the request data
    total_amount = Decimal(request.data.get('totalAmount', '0.0'))
    order_items = request.data.get('orderItems', [])

    # Fetch the current wallet balance
    previous_balance = wallet.balance

    # Check if the user has sufficient balance
    if previous_balance >= total_amount:
        # Subtract totalAmount from the current balance
        new_balance = previous_balance - total_amount

        # Update the wallet balance
        wallet.balance = new_balance
        wallet.save()

        # Serialize the updated wallet
        wallet_serializer = WalletSerializer(wallet)

        # Calculate additional fields from the request payload
        total_items = request.data.get('items', 0)
        tax = Decimal(request.data.get('tax', '0.0'))
        shipping_cost = Decimal(request.data.get('shippingCost', '0.0'))

        # Create an instance of the Order model
        order = Order.objects.create(
            user=user,
            items=total_items,
            amountPaid=total_amount,
            tax=tax,
            shippingCost=shipping_cost,
        )

        # Record the transaction
        description = f"Ordered Items; " + ", ".join([f"{item['product']} (Qty: {item['qty']}) (unit-price: {item['price']})" for item in order_items])

        # Create a string representation of order items for the 'details' field
        details = f"{user.username} placed an order for the items below; " + ", ".join([f"{item['product']} (Qty: {item['qty']}) (unit-price: {item['price']})" for item in order_items])
        type = f"purchase"

        transaction = Transaction.objects.create(
            user=user,
            description=description,
            amount=total_amount,
            previous_balance=previous_balance,
            new_balance=new_balance,
            order=order,
            details=details,
            type=type
        )

        # Create instances of the OrderItem model
        for order_item_data in order_items:
            product_name = order_item_data['product']
            product = Product.objects.get(name=product_name)

            OrderItem.objects.create(
                product=product,
                order=order,
                qty=order_item_data['qty'],
                price=order_item_data['price'],
                image=product.image,  # Set the image field from the Product
                unitTax=order_item_data['unitTax'],
            )

                 # Create an instance of the ShippingAddress model
        shipping_address_data = request.data.get('shippingAddress', {})
        ShippingAddress.objects.create(
            order=order,
            state=shipping_address_data.get('state'),
            city=shipping_address_data.get('city'),
            area=shipping_address_data.get('area'),
            street=shipping_address_data.get('street'),
            houseNumber=shipping_address_data.get('houseNumber'),
            phoneNumber=shipping_address_data.get('phoneNumber'),
            shippingCost=shipping_address_data.get('shippingCost'),
        )


        # Return the new wallet balance in the response
        return JsonResponse({'message': 'Purchase successful', 'newWallet': wallet_serializer.data})
    else:
        return JsonResponse({'error': 'Insufficient balance'}, status=400)
    


class UserTransactionsView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)
    





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transaction_details(request, transaction_id):
    try:
        # Fetch transaction details based on the transaction_id
        transaction = Transaction.objects.get(id=transaction_id)
        order = transaction.order

        # Fetch order items associated with the order
        order_items = OrderItem.objects.filter(order=order)

        # Serialize data for response
        transaction_details = {
            'shippingCost': order.shippingCost,
            'amountPaid': order.amountPaid,
            'orderItems': [
                {
                    'id': item.id,
                    'product': item.product.name,
                    'qty': item.qty,
                    'price': item.price,
                    'unitTax': item.unitTax,
                    'status': item.status,
                    'deliveredIn': calculate_delivered_in(item.created_at) # Calculate remaining time
                }
                for item in order_items
            ]
        }

        return Response(transaction_details)
    except Transaction.DoesNotExist:
        return Response({'error': 'Transaction not found'}, status=404)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)
    except OrderItem.DoesNotExist:
        return Response({'error': 'Order items not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


def calculate_delivered_in(test_date):
    # Calculate the remaining time
    time_diff = timezone.now() - test_date
    remaining_time = timedelta(hours=72) - time_diff  # Assuming the delivery time is within 24 hours
    # Convert remaining time to milliseconds
    remaining_time_ms = remaining_time.total_seconds() * 1000
    return remaining_time_ms
