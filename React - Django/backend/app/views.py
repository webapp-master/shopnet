from django.contrib.auth.models import User
from app.models import Cart, CartItem, Product
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status
from django.contrib.auth.hashers import make_password
from .serializer import ProductSerializer,UserSerializer, CartItemSerializer, OrderSerializer, UserSerializerWithToken
from .models import Order, CartItem, Order
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.decorators import action










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
    product=Product.objects.get(id=pk)
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
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        # Create a cart for the newly registered user
        Cart.objects.create(user=user)  # Assuming Cart has a ForeignKey to User

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'USER WITH THIS EMAIL ALREADY EXISTS'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    



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
                quantity = int(cart_item_data['quantity'])  # Convert to int or your preferred type
                CartItem.objects.create(cart=cart, product=product, quantity=quantity)
            except (Product.DoesNotExist, ValueError):
                pass  # Handle the case if a product does not exist or invalid quantity

        return Response({'message': 'Cart items stored successfully'}, status=200)
    return Response(serializer.errors, status=400)






class OrderViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def save_order_data(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

