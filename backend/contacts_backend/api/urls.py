from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import ListContactView

urlpatterns = [
    path('', ListContactView.as_view(), name='contact_list_view'),
    path('login', obtain_auth_token, name='login')
]
