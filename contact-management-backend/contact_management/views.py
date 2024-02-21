from django.http import JsonResponse
from .models import Contact
from .serializers import ContactSerializer

def contact_list(request):
    contacts = Contact.objects.all() # get all the contacts
    serializer = ContactSerializer(contacts, many=True) # serialize them
    return JsonResponse({ "contacts": serializer.data}, safe=False) # return the json