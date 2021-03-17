from django.db import models

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=40, null=False)
    number = models.CharField(max_length=12, null=False)

    def __str__(self) -> str:
        return self.name
