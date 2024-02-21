from django.http import JsonResponse
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
        
        
        