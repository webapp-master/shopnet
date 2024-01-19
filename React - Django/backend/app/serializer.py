from django.db import models
from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Product, Profile, Wallet
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
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'phoneNumber', 'City']


class CreditWalletSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    username = serializers.CharField(max_length=150)


class WalletSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Wallet
        fields = ['user', 'balance']


class DebitWalletSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
