from django.contrib import admin
from django.urls import path,include
from rest_framework.documentation import include
from rest_framework import routers

from univentas import views

routerUsuario=routers.DefaultRouter()
routerUsuario.register(r'',views.usuarioView,'/usuario')

urlpatterns = [
    path("api/v1/usuario", include(routerUsuario.urls)),
]
