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
