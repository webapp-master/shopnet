# Generated by Django 4.2.4 on 2024-02-05 20:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0025_alter_product_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='type',
        ),
    ]