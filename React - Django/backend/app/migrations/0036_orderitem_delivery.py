# Generated by Django 4.2.4 on 2024-02-28 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0035_wallet_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='delivery',
            field=models.IntegerField(default=0),
        ),
    ]
