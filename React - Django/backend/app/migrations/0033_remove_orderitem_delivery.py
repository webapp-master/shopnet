# Generated by Django 4.2.4 on 2024-02-27 22:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0032_orderitem_delivery_alter_orderitem_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='delivery',
        ),
    ]