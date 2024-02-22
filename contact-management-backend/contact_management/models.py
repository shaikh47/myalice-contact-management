from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.conf import settings

class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=500)
    phonenumber = models.CharField(max_length=500)

    def __str__(self):
        return self.name+"        "+self.description

    # to make the db from this file just make another migration with manage.pt makemigration
class ContactProfile(models.Model):
    contact_profile_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    notes = models.TextField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    source = models.TextField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    
class Label(models.Model):
    label_id = models.AutoField(primary_key=True)
    contact_profile = models.ForeignKey(ContactProfile, on_delete=models.CASCADE)
    label_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class ContactNumber(models.Model):
    contact_number_id = models.AutoField(primary_key=True)
    contact_profile = models.ForeignKey(ContactProfile, on_delete=models.CASCADE)
    number = models.CharField(max_length=20)
    contact_type = models.CharField(max_length=50)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)