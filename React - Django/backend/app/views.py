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

from rest_framework import status
from django.contrib.auth.hashers import make_password
from .serializer import ProductSerializer,UserSerializer,UserSerializerWithToken
from .models import Order, OrderItem
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt







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
    data=request.data
    print(data)
    try:

        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={'details':'USER WITH THIS EMAIL ALREADY EXIST'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    








@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    try:
        user = request.user
        print('Received Token:', request.auth)  # Print the received token
        cartItems = user.cart.cartItems.all()  # Correctly retrieve cart items

        if not cartItems:
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(user=user, paymentMethod='YourPaymentMethodHere')

        for item in cartItems:
            OrderItem.objects.create(order=order, product=item.product, quantity=item.qty)

        # Calculate taxPrice, shippingPrice, and totalPrice as needed
        order.taxPrice = 0  # Calculate tax
        order.shippingPrice = 0  # Calculate shipping
        order.totalPrice = order.taxPrice + order.shippingPrice  # Calculate total

        order.save()

        # Clear the user's cart after successful order creation
        user.cart.cartItems.clear()

        return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': f'Error creating order: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    







