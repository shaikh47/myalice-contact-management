from rest_framework import serializers
from .models import Contact, ContactProfile, Label, ContactNumber
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'description']
        
class ContactProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactProfile
        fields = ['contact_profile_id','first_name', 'last_name', 'email', 'notes', 'birthday', 'company', 'address', 'source', 'created_at', 'updated_at', 'username']
        extra_kwargs = {
            'first_name': {'required': True},
        }
        
class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ['label_id', 'contact_profile', 'label_name', 'created_at', 'updated_at']

class ContactNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactNumber
        fields = ['contact_number_id', 'contact_profile', 'number', 'contact_type', 'is_primary', 'created_at', 'updated_at']
        
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'password': {'write_only': True},  
            'first_name': {'required': True},
            'last_name': {'required': True},
        }