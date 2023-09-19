from django.contrib import admin
from .models import Campaign, UploadedFile, Contact, Homepage


#i put things to views here for my admin page


admin.site.register(Campaign)
admin.site.register(UploadedFile)
admin.site.register(Contact)
admin.site.register(Homepage)

