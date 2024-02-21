"""
URL configuration for contact_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from contact_management import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import re_path

from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contacts/', views.get_all_contacts),
    path('contacts/<int:contact_profile_id>', views.update_contact),
    
    path('add_label/', views.add_label_for_contact),
    path('update_label/', views.update_label_for_contact),
    path('delete_label/', views.delete_label_for_contact),
    
    path('add_number/', views.add_number_for_contact),
    path('update_number/', views.update_number_for_contact),
    path('delete_number/', views.delete_number_for_contact),
    
    re_path('signup/', views.signup),
    re_path('login/', views.login),
    re_path('loggedindata/', views.get_login_user_data_from_jwt),
]

urlpatterns = format_suffix_patterns(urlpatterns)