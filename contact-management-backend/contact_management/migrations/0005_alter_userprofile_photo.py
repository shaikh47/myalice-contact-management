# Generated by Django 5.0.2 on 2024-02-21 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact_management', '0004_userprofile_delete_customuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='photo',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
