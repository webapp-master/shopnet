from django.db import models
from django.contrib.auth.models import User  # If using Django's built-in User model



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=15, blank=True, null=True)
    City = models.CharField(max_length=200, null=True, blank=True)
    wallet = models.OneToOneField('Wallet', related_name='profile', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"




class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
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
    # Add more fields as needed for your wallet model

    def __str__(self):
        return f"Wallet of {self.user.username}"
    



class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    previous_balance = models.DecimalField(max_digits=10, decimal_places=2)
    new_balance = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction for {self.user.username} at {self.timestamp}" 


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    amountPaid = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=True)
    isProcessed = models.BooleanField(default=False)
    processedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Set the 'name' field to the concatenation of 'firstName' and 'last_name'
        if self.user:
            self.name = f"{self.user.first_name} {self.user.last_name}"

        super(Order, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.createdAt)
    


class OrderItem(models.Model):
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order=models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    qty=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
        
    def __str__(self):
        return self.name

