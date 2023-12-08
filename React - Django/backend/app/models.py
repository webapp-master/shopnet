from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User  # If using Django's built-in User model



class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    tax = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True) 

    def __str__(self):
        return self.name
    




class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cartItems = models.ManyToManyField(Product, through='CartItem')
    



class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)

        



class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    paymentMethod=models.CharField(max_length=200,null=True,blank=True)
    shippingCost=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    totalItem=models.IntegerField(null=True,blank=True,default=0)
    totalAmount=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    isPaid=models.BooleanField(default=False)
    paidAt=models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered=models.BooleanField(default=False)
    deliveredAt=models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    
    
    
    def __str__(self):
        return str(self.createdAt)
    
    def save(self, *args, **kwargs):
        # Set paymentMethod to 'wallet' if it's not provided
        if not self.paymentMethod:
            self.paymentMethod = 'wallet'
        
        super().save(*args, **kwargs)




class OrderItem(models.Model):
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order=models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    qty=models.IntegerField(null=True,blank=True,default=0)
    unitPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    totalPrice=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    
    
        
    def __str__(self):
        return str(self.product.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='shipping_address')
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    street = models.CharField(max_length=255)
    house_number = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Additional fields if needed

    def __str__(self):
        return f"{self.order} - Shipping Address"
    




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=15, blank=True, null=True)
    City = models.CharField(max_length=200, null=True, blank=True) 
