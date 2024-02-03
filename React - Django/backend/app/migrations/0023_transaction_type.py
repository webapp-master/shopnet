# Generated by Django 4.2.4 on 2024-02-02 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0022_product_sku_product_specification_supplier'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='type',
            field=models.CharField(choices=[('credt', 'Credit'), ('debit', 'Debit'), ('purchase', 'Purchase'), ('unknown', 'Unknown')], default='unknown', max_length=20),
        ),
    ]