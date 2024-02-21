from django.http import JsonResponse
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

import jwt
from rest_framework_simplejwt.authentication import JWTAuthentication
JWT_authenticator = JWTAuthentication()

@api_view(['GET', 'POST'])
def contact_list(request, format=None):
    if request.method == 'GET':
        contacts = Contact.objects.all() # get all the contacts
        serializer = ContactSerializer(contacts, many=True) # serialize them
        return Response(serializer.data) # return the json
    
    if request.method == 'POST':
        serializer = ContactSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def contact_detail(request, id, format=None):
    try:
        contact = Contact.objects.get(pk=id)
    except Contact.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ContactSerializer(contact)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = ContactSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        refresh = RefreshToken.for_user(user)
        refresh['username'] = user.username
        access_token = str(refresh.access_token)
        return Response({'token': access_token, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    refresh = RefreshToken.for_user(user)
    refresh['username'] = user.username
    access_token = str(refresh.access_token)
    serializer = UserSerializer(user)
    return Response({'token': access_token, 'user': serializer.data})

@api_view(['GET'])
def get_login_user_data_from_jwt(request):
    IsAuthenticated(request)
    
    response = JWT_authenticator.authenticate(request)
    user, token = response
    username_jwt = token.payload.get('username')
    username_db = User.objects.filter(username=username_jwt).first()
    
    full_user_data = {
        'id': username_db.id,
        'username': username_db.username,
        'email': username_db.email,
        'first_name': username_db.first_name,
        'last_name': username_db.first_name,
    }
    return Response({"data": full_user_data})
        
def IsAuthenticated(request):
    response = JWT_authenticator.authenticate(request)
    if response is not None:
        # unpacking
        user, token = response
        print("this is decoded token claims", token.payload)
        
        username_jwt = token.payload.get('username')
        username_db = User.objects.filter(username=username_jwt).first()
        
        if username_db and username_db.username != username_jwt:
            return Response("Unauthorized", status=401)
    else:
        return Response("Unauthorized", status=401)