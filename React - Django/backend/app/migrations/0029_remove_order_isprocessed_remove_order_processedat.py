# Generated by Django 4.2.4 on 2024-02-07 13:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0028_alter_product_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='isProcessed',
        ),
        migrations.RemoveField(
            model_name='order',
            name='processedAt',
        ),
    ]
