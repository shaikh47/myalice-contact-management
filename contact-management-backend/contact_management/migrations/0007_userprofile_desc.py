# Generated by Django 5.0.2 on 2024-02-21 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact_management', '0006_rename_photo_userprofile_photo_as_blob'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='desc',
            field=models.CharField(default=None, max_length=500),
            preserve_default=False,
        ),
    ]
