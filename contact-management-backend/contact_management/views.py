from django.http import JsonResponse
from .models import Contact, ContactProfile, Label, ContactNumber
from .serializers import ContactSerializer, ContactProfileSerializer, LabelSerializer, ContactNumberSerializer
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
from django.db import IntegrityError

import jwt
from rest_framework_simplejwt.authentication import JWTAuthentication
JWT_authenticator = JWTAuthentication()

@api_view(['POST'])
def signup(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Attempt to save the user
            serializer.save()

            # Set password and save user instance
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()

            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username
            access_token = str(refresh.access_token)

            return Response({'token': access_token, 'user': serializer.data}, status=status.HTTP_201_CREATED)

    except IntegrityError as e:
        # Handle IntegrityError (e.g., duplicate user)
        error_message = str(e)
        if 'unique constraint' in error_message.lower():
            return Response({'error': 'Username or email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Database error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['GET', 'POST']) 
def get_all_contacts(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'GET':   
        try:
            contact_profiles = ContactProfile.objects.all()
            contact_profiles_data = []
            for contact_profile in contact_profiles:
                labels = Label.objects.filter(contact_profile=contact_profile)
                contact_numbers = ContactNumber.objects.filter(contact_profile=contact_profile)

                contact_profile_data = ContactProfileSerializer(contact_profile).data
                labels_data = LabelSerializer(labels, many=True).data
                contact_numbers_data = ContactNumberSerializer(contact_numbers, many=True).data

                contact_profile_data['labels'] = labels_data
                contact_profile_data['contact_numbers'] = contact_numbers_data

                contact_profiles_data.append(contact_profile_data)

            return Response({'contact_profiles': contact_profiles_data})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
    elif request.method == 'POST':   
        try:
            # Deserialize the request data using the ContactProfileSerializer
            contact_profile_serializer = ContactProfileSerializer(data=request.data)
            if contact_profile_serializer.is_valid():
                # Save the ContactProfile instance
                contact_profile = contact_profile_serializer.save()

                # Process and save associated Label instances
                labels_data = request.data.get('labels', [])
                for label_data in labels_data:
                    label_data['contact_profile'] = contact_profile.contact_profile_id  # Add contact_profile field to each label_data
                label_serializer = LabelSerializer(data=labels_data, many=True)
                if label_serializer.is_valid():
                    label_serializer.save()

                # Process and save associated ContactNumber instances
                contact_numbers_data = request.data.get('contact_numbers', [])
                for contact_number_data in contact_numbers_data:
                    contact_number_data['contact_profile'] = contact_profile.contact_profile_id  # Add contact_profile field to each contact_number_data
                contact_number_serializer = ContactNumberSerializer(data=contact_numbers_data, many=True)
                if contact_number_serializer.is_valid():
                    contact_number_serializer.save()

                # Update the serialized data to include the nested relationships
                serialized_data = contact_profile_serializer.data
                serialized_data['labels'] = label_serializer.data
                serialized_data['contact_numbers'] = contact_number_serializer.data

                return Response({'message': 'Contact profile created successfully', 'data': serialized_data}, status=status.HTTP_201_CREATED)

            return Response(contact_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@api_view(['GET', 'PUT', 'DELETE'])
def update_contact(request, contact_profile_id):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'GET':
        try:
            contact_profile = ContactProfile.objects.get(contact_profile_id=contact_profile_id)
            labels = Label.objects.filter(contact_profile=contact_profile)
            contact_numbers = ContactNumber.objects.filter(contact_profile=contact_profile)

            contact_profile_data = ContactProfileSerializer(contact_profile).data
            labels_data = LabelSerializer(labels, many=True).data
            contact_numbers_data = ContactNumberSerializer(contact_numbers, many=True).data

            contact_profile_data['labels'] = labels_data
            contact_profile_data['contact_numbers'] = contact_numbers_data

            return Response({'contact_profile': contact_profile_data})

        except ContactProfile.DoesNotExist:
            return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    elif request.method == 'PUT':
        try:
            contact_profile = ContactProfile.objects.get(contact_profile_id=contact_profile_id)
            contact_profile_serializer = ContactProfileSerializer(contact_profile, data=request.data)
            if contact_profile_serializer.is_valid():
                contact_profile_serializer.save()
                return Response({'message': 'Contact profile updated successfully'}, status=status.HTTP_200_OK)
            return Response(contact_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except ContactProfile.DoesNotExist:
            return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == 'DELETE':
        try:
            contact_profile = ContactProfile.objects.get(contact_profile_id=id)
            contact_profile.delete()
            return Response({'message': 'Contact profile deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

        except ContactProfile.DoesNotExist:
            return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
def add_label_for_contact(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        contact_profile_id = request.query_params.get('contact_id')
        contact_profile = ContactProfile.objects.get(contact_profile_id=contact_profile_id)
        label_data = request.data
        label_data['contact_profile'] = contact_profile.contact_profile_id
        serializer = LabelSerializer(data=label_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Label added to contact successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ContactProfile.DoesNotExist:
        return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def update_label_for_contact(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        contact_profile_id = request.query_params.get('contact_id')
        label_id = request.query_params.get('label_id')
     
        contact_profile = ContactProfile.objects.get(contact_profile_id=contact_profile_id)
        
        label = Label.objects.get(pk=label_id, contact_profile=contact_profile)

        label_serializer = LabelSerializer(label, data=request.data, partial=True)
        if label_serializer.is_valid():
            label_serializer.validated_data['contact_profile'] = contact_profile
            label_serializer.save()
            return Response({'message': 'Label updated successfully', 'data': label_serializer.data}, status=status.HTTP_200_OK)

        return Response(label_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ContactProfile.DoesNotExist:
        return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

    except Label.DoesNotExist:
        return Response({'error': 'Label not found for the contact profile'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_label_for_contact(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        contact_profile_id = request.query_params.get('contact_id')
        label_id = request.query_params.get('label_id')
        
        contact_profile = ContactProfile.objects.get(contact_profile_id=contact_profile_id)
        label = Label.objects.get(pk=label_id, contact_profile=contact_profile)
        label.delete()

        return Response({'message': 'Label deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    except ContactProfile.DoesNotExist:
        return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

    except Label.DoesNotExist:
        return Response({'error': 'Label not found for the contact profile'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_number_for_contact(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        contact_id = request.query_params.get('contact_id')
        contact_profile = ContactProfile.objects.get(contact_profile_id=contact_id)
        contact_number_data = request.data
        contact_number_data['contact_profile'] = contact_profile.contact_profile_id
        serializer = ContactNumberSerializer(data=contact_number_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Contact number added to contact successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ContactProfile.DoesNotExist:
        return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def update_number_for_contact(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        contact_profile_id = request.query_params.get('contact_id')
        number_id = request.query_params.get('number_id')
     
        contact_profile = ContactProfile.objects.get(contact_profile_id=contact_profile_id)
        
        number = ContactNumber.objects.get(pk=number_id, contact_profile=contact_profile)

        number_serializer = ContactNumberSerializer(number, data=request.data, partial=True)
        if number_serializer.is_valid():
            number_serializer.validated_data['contact_profile'] = contact_profile
            number_serializer.save()
            return Response({'message': 'Number updated successfully', 'data': number_serializer.data}, status=status.HTTP_200_OK)

        return Response(number_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ContactProfile.DoesNotExist:
        return Response({'error': 'Contact profile not found'}, status=status.HTTP_404_NOT_FOUND)

    except ContactNumber.DoesNotExist:
        return Response({'error': 'Number not found for the contact profile'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
def delete_number_for_contact(request):
    isAuthenticated = IsAuthenticated(request)
    if isAuthenticated != 200:
        return Response({'data': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        IsAuthenticated(request)
        contact_profile_id = request.query_params.get('contact_id')
        number_id = request.query_params.get('number_id')
        contact_number = ContactNumber.objects.get(contact_profile=contact_profile_id, contact_number_id=number_id)
        contact_number.delete()
        return Response({'message': 'Contact number deleted from contact successfully'}, status=status.HTTP_204_NO_CONTENT)

    except ContactNumber.DoesNotExist:
        return Response({'error': 'Contact number not found for the contact'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def IsAuthenticated(request):
    response = JWT_authenticator.authenticate(request)
    print("this shit: ", response)
    
    if response is None:
        return 401
    else:
        # unpacking
        user, token = response
        print("this is decoded token claims", token.payload)
        
        username_jwt = token.payload.get('username')
        username_db = User.objects.filter(username=username_jwt).first()
        
        if username_db and username_db.username != username_jwt:
            return 401
    return 200
    