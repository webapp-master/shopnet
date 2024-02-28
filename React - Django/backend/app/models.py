from django.db import models
from django.contrib.auth.models import User  # If using Django's built-in User model
from django.utils import timezone



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=15, blank=True, null=True)
    City = models.CharField(max_length=200, null=True, blank=True)
    wallet = models.OneToOneField('Wallet', related_name='profile', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"




class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=40, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    specification = models.TextField(null=True, blank=True)
    sku = models.CharField(max_length=50, null=True, blank=True, unique=True)
    rating = models.IntegerField(null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True) 

    def __str__(self):
        return self.name
    



class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    name = models.CharField(max_length=255, blank=True) 

    def __str__(self):
        return f"Wallet of {self.user.username}"

    def save(self, *args, **kwargs):
        # Populate the 'name' field with the concatenated first name and last name
        if self.user:
            self.name = f"{self.user.first_name} {self.user.last_name}"
        super().save(*args, **kwargs)

    



class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=100, null=True, blank=True)
    details = models.CharField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    previous_balance = models.DecimalField(max_digits=10, decimal_places=2)
    new_balance = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20, choices=[('credit', 'Credit'), ('debit', 'Debit'), ('purchase', 'Purchase'), ('unknown', 'Unknown')], default='unknown')

    def __str__(self):
        return f"Transaction for {self.user.username} at {self.timestamp}" 


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    items = models.IntegerField(null=True, blank=True) 
    amountPaid = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    tax=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    shippingCost=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    isPaid = models.BooleanField(default=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Set the 'name' field to the concatenation of 'firstName' and 'last_name'
        if self.user:
            self.name = f"{self.user.first_name} {self.user.last_name}"

        super(Order, self).save(*args, **kwargs)

    @property
    def is_delivered_display(self):
        return "Yes" if self.isDelivered else "No"

    def __str__(self):
        return f"{self.name} - No. of Items: {self.items} -------Delivered?: {self.is_delivered_display}"
    


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    unitTax = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('processing', 'processing'), ('dispatched', 'dispatched'), ('delivered', 'delivered')], default='processing')
    status_created_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
 
    
    

    def save(self, *args, **kwargs):
        if not self.status_created_at:
            self.status_created_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product} - Qty: {self.qty}, Price: {self.price}----------Status: {self.status}"
    


class ShippingAddress(models.Model):
    order=models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
    state=models.CharField(max_length=200,null=True,blank=True)
    city=models.CharField(max_length=200,null=True,blank=True)
    area=models.CharField(max_length=200,null=True,blank=True)
    street=models.CharField(max_length=200,null=True,blank=True)
    houseNumber = models.CharField(max_length=15, blank=True, null=True)
    phoneNumber = models.CharField(max_length=15, blank=True, null=True)
    shippingCost=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    
    def __str__(self):
        return f"State: {self.state}, City: {self.city}, Phone Number: {self.phoneNumber}"



class Supplier(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    shop_address = models.TextField(blank=True, null=True)
    home_address = models.TextField(blank=True, null=True)
    instagram_handle = models.CharField(max_length=100, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    whatsapp_number = models.CharField(max_length=15, blank=True, null=True)
    cost_price = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], blank=True, null=True)
    terms_and_conditions = models.TextField(blank=True, null=True)
    business_relationship_status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')], default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Supplier's Name: {self.name} || Product: {self.product.name}"