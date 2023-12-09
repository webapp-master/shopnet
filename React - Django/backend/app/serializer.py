from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Product, Profile
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'firstName', 'last_name', 'isAdmin']

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
        fields = ['id', 'username', 'email', 'firstName', 'last_name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class ProfileSerializer(serializers.ModelSerializer):
    phoneNumber = serializers.CharField(allow_null=True, allow_blank=True)
    City = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta:
        model = Profile
        fields = ['phoneNumber', 'City']





