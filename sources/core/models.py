from django.db import models

class Vault(models.Model):
    title = models.CharField(max_length=200)
