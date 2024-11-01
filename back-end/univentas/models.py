from django.db import models


class usuario(models.Model):
    correo =models.CharField(max_length=150)
    nit=models.CharField(max_length=10)
    password=models.CharField(max_length=10)
    numeroDocumento=models.CharField(max_length=10)
    tipo_documento=[
        
        (1,'cedula ciudadania'),
        (2, 'tarjeta de identidad'),
        (3,'cedula extranjera'),
        (4,'pasaporte')
              
    ]
    tipoDocumento = models.IntegerField(choices=tipo_documento)
def _str_(self):
        return self.numeroDocumento
# Create your models here.
