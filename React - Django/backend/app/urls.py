from django.urls import path, include
from app import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
    path('users/register/', views.registerUser, name='register'),
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/', views.getProducts, name="getProducts"),
    path('user/profile/', views.getUserProfiles, name="getUserProfiles"),
    path('products/<str:pk>', views.getProduct, name="getProduct"),
    path('users/', views.getUsers, name="getUsers"),
    path('wallet/credit/', views.credit_wallet, name='credit_wallet'),
    path('wallet/debit/', views.debit_wallet, name='debit_wallet'),
    path('user/wallet/balance', views.get_wallet_balance, name='get_wallet_balance'),
    path('make_purchase/', views.make_purchase, name='make_purchase'),
    path('user/transactions/', views.UserTransactionsView.as_view(), name='user_transactions'),
    path('transaction/<int:transaction_id>/details/', views.get_transaction_details, name='get_transaction_details'),
]