# Generated by Django 4.2.4 on 2023-12-11 11:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_transaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='wallet',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='app.wallet'),
        ),
    ]
