from django.db import models
class Contact(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name+"        "+self.description

    # to make the db from this file just make another migration with manage.pt makemigration