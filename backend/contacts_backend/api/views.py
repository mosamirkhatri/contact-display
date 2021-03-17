from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer

# Create your views here.


# class ContactView(APIView):

#     def get(self, request):
#         query_data = Contact.objects.all()
#         response_data = ContactSerializer(data=query_data, many=True)

#         if response_data.is_valid():
#             return Response(response_data.data, status=status.HTTP_200_OK)
#         return Response({"message": response_data.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListContactView(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
