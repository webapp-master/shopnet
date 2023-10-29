from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Product
from .models import Order  # Import the Order model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=User
#         fields=['id','username','email']
        
class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    wallet_balance = serializers.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Add this field
    class Meta:
        model=UserProfile
        fields=['id','_id','username','email','name','isAdmin']

    def get_name(self,obj):
        name=obj.first_name
        if name=="":
            name=obj.email
        return name
    
    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin','token']
    
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'  # You can specify the fields you want to include or use '__all__' to include all fields