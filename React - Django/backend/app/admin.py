from django.contrib import admin
from app.models import *


class OrderItemAdmin(admin.ModelAdmin):
    readonly_fields = ('product', 'order', 'qty', 'price', 'image', 'unitTax', 'status_created_at',)
    list_display = ('product','qty', 'price', 'status', 'status_created_at',)
    list_editable = ('status',)  # Makes the 'status' field editable in the list view

    # Optionally, you can customize the form fields for the add and change views
    #fields = ('status',)  # If you want to limit the fields shown in the add and change views

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'details', 'order', 'type', 'timestamp')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'items', 'isDelivered', 'deliveredAt', 'createdAt')
    


# Register your models here.
admin.site.register(Profile)
admin.site.register(Product)
admin.site.register(Wallet)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(ShippingAddress)
admin.site.register(Supplier)
admin.site.register(OrderItem, OrderItemAdmin)    # Register the custom admin class with the OrderItem model
