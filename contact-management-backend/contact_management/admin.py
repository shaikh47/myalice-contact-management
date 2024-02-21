# register our tables here to show to the admin panel

from django.contrib import admin
from .models import Contact, ContactProfile, Label, ContactNumber

admin.site.register(Contact)
admin.site.register(ContactProfile)
admin.site.register(Label)
admin.site.register(ContactNumber)