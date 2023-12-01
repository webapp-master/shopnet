from django.urls import path, include
from app import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,

)
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')



urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
    path('users/register/', views.registerUser, name='register'),
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/', views.getProducts, name="getProducts"),
    path('user/profile/', views.getUserProfiles, name="getUserProfiles"),
    path('products/<str:pk>', views.getProduct, name="getProduct"),
    path('users/', views.getUsers, name="getUsers"),
    path('store-cart-items/', views.store_cart_items, name="storecartitems"),
    path('orders/save_order_data/', OrderViewSet.as_view({'post': 'save_order_data'}), name='save_order_data'),

]

urlpatterns += router.urls  # Include the router's URL patterns


