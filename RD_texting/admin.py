from django.contrib import admin
from .models import Campaign, UploadedFile, User

#i put things to views here for my admin page


admin.site.register(Campaign)
admin.site.register(UploadedFile)


