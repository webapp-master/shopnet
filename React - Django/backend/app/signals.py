# from django.db.models.signals import pre_save
# from django.contrib.auth.models import User

# def updateUser(sender, instance, **kwargs):
#     print('Signal Triggered')
#     user = instance
#     if user.email != '':
#         user.username = user.email

# pre_save.connect(updateUser, sender=User)




# """
# Purpose:
# The purpose of this signal is to ensure that when a User instance is being saved, if the email field is provided and not empty,
# it will update the username field to match the email. This synchronization between email and username could be beneficial for 
# scenarios where email is the primary means of identification and username is expected to match it for simplicity.
# 
# This signal allows for a dynamic update of username based on changes or additions to the email field before the User instance is persisted in the database.
# """
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Wallet, Profile, OrderItem, Order
from django.db.models.signals import pre_save, post_save
from django.utils import timezone


@receiver(post_save, sender=User)
def create_user_profile_and_wallet(sender, instance, created, **kwargs):
    print('Signal Triggered')
    if created:
        # Create a Wallet instance for the new user
        wallet_instance = Wallet.objects.create(user=instance, balance=0.00)

        # Update the Profile instance with the created wallet
        profile_instance, created_profile = Profile.objects.get_or_create(user=instance)
        profile_instance.wallet = wallet_instance
        profile_instance.phoneNumber = instance.profile.phoneNumber  # Ensure phoneNumber is handled
        profile_instance.City = instance.profile.City  # Ensure City is handled
        profile_instance.save()




@receiver(pre_save, sender=OrderItem)
def update_status_created_at(sender, instance, **kwargs):
    """
    Signal handler to update 'status_created_at' field before saving OrderItem instance.
    """
    if instance.pk:  # Check if the instance is already saved
        # Fetch the current status from the database
        try:
            old_instance = sender.objects.get(pk=instance.pk)
            old_status = old_instance.status
        except sender.DoesNotExist:
            old_status = None
        
        # If the status field is being updated and the new status is different from the old status
        if instance.status != old_status:
            instance.status_created_at = timezone.now()  # Update 'status_created_at' with current time

@receiver(post_save, sender=OrderItem)
def update_status_created_at_on_change(sender, instance, created, **kwargs):
    """
    Signal handler to update 'status_created_at' field after saving OrderItem instance.
    """
    if not created:  # Only proceed if the instance is not newly created
        # Fetch the current status from the database
        try:
            old_instance = sender.objects.get(pk=instance.pk)
            old_status = old_instance.status
        except sender.DoesNotExist:
            old_status = None
        
        # If the status field is changed from the previous value
        if instance.status != old_status:
            instance.status_created_at = timezone.now()  # Update 'status_created_at' with current time
            instance.save(update_fields=['status_created_at'])  # Save only 'status_created_at' field



@receiver(post_save, sender=OrderItem)
def update_order_status(sender, instance, created, **kwargs):
    if not created:  # Skip if the OrderItem instance is newly created
        order = instance.order  # Get the associated Order
        if order:  # Check if the Order exists
            all_items_delivered = order.orderitem_set.filter(status='delivered').count() == order.orderitem_set.count()
            any_item_not_delivered = order.orderitem_set.exclude(status='delivered').exists()
            if all_items_delivered:
                # If all OrderItems are marked as delivered, update the corresponding Order
                order.isDelivered = True
                order.save(update_fields=['isDelivered'])
                order.deliveredAt = timezone.now()  # Stamp the deliveredAt field with current time
                order.save(update_fields=['deliveredAt'])
            elif any_item_not_delivered:
                # If any OrderItem is not marked as delivered, update the corresponding Order
                order.isDelivered = False
                order.save(update_fields=['isDelivered'])
                order.deliveredAt = timezone.now()
                order.save(update_fields=['deliveredAt'])






