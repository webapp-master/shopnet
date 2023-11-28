from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Product,  OrderItem, Order, Profile
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields=['id','username','email']


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firstName', 'isAdmin']

    def get_firstName(self, obj):
        firstName = obj.first_name
        if firstName == "":
            firstName = obj.email
        return firstName

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firstName', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class ProfileSerializer(serializers.ModelSerializer):
    phoneNumber = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta:
        model = Profile
        fields = ['phoneNumber']



class CartItemSerializer(serializers.Serializer):
    cartItems = serializers.ListField(
        child=serializers.DictField(
            # Adjust field types if needed
            child=serializers.CharField(max_length=100)
        )
    )


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'qty', 'unitPrice', 'totalPrice']


class OrderSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Order
        fields = ['user', 'paymentMethod', 'shippingCost', 'totalAmount', 'totalItem', 'isPaid',
                  'paidAt', 'isDelivered', 'deliveredAt', 'createdAt']

