# Generated by Django 4.2.4 on 2024-02-07 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0030_orderitem_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='status_created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
