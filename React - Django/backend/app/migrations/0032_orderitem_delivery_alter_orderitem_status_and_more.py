# Generated by Django 4.2.4 on 2024-02-24 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0031_orderitem_status_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='delivery',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='status',
            field=models.CharField(choices=[('processing', 'processing'), ('dispatched', 'dispatched'), ('delivered', 'delivered')], default='processing', max_length=20),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='type',
            field=models.CharField(choices=[('credit', 'Credit'), ('debit', 'Debit'), ('purchase', 'Purchase'), ('unknown', 'Unknown')], default='unknown', max_length=20),
        ),
    ]
