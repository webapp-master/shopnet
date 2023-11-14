from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Product, Cart, CartItem, Order
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    cart = serializers.SerializerMethodField(read_only=True)  # Include cart here

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'cart']  # Add cart to the fields list

    def get_name(self, obj):
        name = obj.first_name
        if not name:
            name = obj.email
        return name

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_cart(self, obj):
        # Fetch and serialize the user's cart information here
        cart = Cart.objects.get_or_create(user=obj)  # Assuming Cart is related to User
        serialized_cart = CartSerializer(cart).data
        return serialized_cart


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    cart = CartSerializer(read_only=True)  # Assuming there's a relationship between User and Cart

    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token', 'cart']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)




class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    cart = CartSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
