from django.shortcuts import render
from rest_framework import viewsets,filters,status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializer import usuarioSerializer
from .models import usuario



class usuarioView(viewsets.ModelViewSet):
    serializer_class=usuarioSerializer
    queryset=usuario.objects.all()
    filter_backends=[filters.SearchFilter]
    search_fields={'$correo','$nit','$password','numeroDocumento'}

# Create your views here.
