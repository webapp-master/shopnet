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
from .serializer import ProductSerializer,UserSerializer,OrderItemSerializer,UserSerializerWithToken

from .models import OrderItem




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
def checkout(request):
    user = request.user  # Assuming you have user authentication in place
    cart_items = request.data['cart_items']  # Get the cart items from the frontend

    order_items = []
    for cart_item in cart_items:
        order_items.append(
            {
                'user': user.id,
                'product_id': cart_item['product_id'],
                'product_name': cart_item['name'],
                'product_image': cart_item['image'],
                'quantity': cart_item['qty'],
                'price_per_unit': cart_item['price'],
                'total_price': cart_item['qty'] * cart_item['price'],
            }
        )

    serializer = OrderItemSerializer(data=order_items, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Order items saved successfully'})
    else:
        return Response(serializer.errors, status=400)
