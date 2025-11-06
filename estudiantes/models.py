from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=50)
    edad = models.IntegerField()
    carrera = models.CharField(max_length=50)

    class Meta:
        db_table = 'estudiantes'
        managed = False

    def __str__(self):
        return self.nombre