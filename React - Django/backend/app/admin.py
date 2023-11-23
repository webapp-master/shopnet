from django.contrib import admin
from app.models import *
# Register your models here.

admin.site.register(Product)
admin.site.register(Order)

admin.site.register(ShippingAddress)

admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(OrderItem)