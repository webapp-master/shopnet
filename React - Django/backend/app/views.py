from django.contrib.auth.models import User
from app.models import Cart, CartItem, Product, Profile
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status
from django.contrib.auth.hashers import make_password
from .serializer import ProductSerializer, UserSerializer, ProfileSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer, UserSerializerWithToken
from .models import Order, CartItem, Order
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.decorators import action

from django.db import IntegrityError


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






# register the new users




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

        profile = Profile.objects.create(
            user=user,
            phoneNumber=data.get('phoneNumber'),  # Save phoneNumber if provided
            City=data.get('City')
        )

        # Create a cart for the newly registered user
        # Assuming Cart has a ForeignKey to User
        Cart.objects.create(user=user)

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


def initialize_cart_for_user(user):
    if not hasattr(user, 'cart') or user.cart is None:
        Cart.objects.create(user=user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def store_cart_items(request):
    serializer = CartItemSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        cart_items_list = serializer.validated_data['cartItems']

        cart, created = Cart.objects.get_or_create(user=user)
        for cart_item_data in cart_items_list:
            try:
                product = Product.objects.get(id=cart_item_data['product'])
                # Convert to int or your preferred type
                quantity = int(cart_item_data['quantity'])
                CartItem.objects.create(
                    cart=cart, product=product, quantity=quantity)
            except (Product.DoesNotExist, ValueError):
                pass  # Handle the case if a product does not exist or invalid quantity

        return Response({'message': 'Cart items stored successfully'}, status=200)
    return Response(serializer.errors, status=400)


class OrderViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def save_order_data(self, request):
        order_serializer = OrderSerializer(data=request.data.get('order', []))
        if order_serializer.is_valid():
            order = order_serializer.save()

            # Now handle creation of OrderItems
            order_items_data = request.data.get('orderItems', [])
            order_items = []
            for item_data in order_items_data:
                order_item_serializer = OrderItemSerializer(data=item_data)
                if order_item_serializer.is_valid():
                    # Associate each OrderItem with the created Order
                    order_item = order_item_serializer.save(order=order)
                    order_items.append(order_item)

            response_data = order_serializer.data
            response_data['orderItems'] = OrderItemSerializer(
                order_items, many=True).data
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
