# register our tables here to show to the admin panel

from django.contrib import admin
from .models import Contact

admin.site.register(Contact)