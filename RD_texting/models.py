from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# classes fopr database
#each class is a table


class Campaign(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    ad_title = models.CharField(max_length=100, default="Default Title")
    ad_content = models.TextField(default="Default ad content")
    region = models.CharField(max_length=20, default="Default Region")
    area = models.CharField(max_length=20, default="Default Area")  # Changed "location" to "area"
    city = models.CharField(max_length=20, default="Default City")  # Added "city" field
    age_group = models.CharField(max_length=20, default="Default Age Group")
    audience_size = models.CharField(max_length=20, default="Default Audience Size")
    frequency_in_hours = models.PositiveIntegerField()
    last_sent = models.DateTimeField(blank=True, null=True) 


class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    phone_number = models.PositiveIntegerField(default=123456789)  
    email = models.CharField(max_length=255, default="example@example.com")  
    name = models.CharField(max_length=255, default="Default Name")  
    description = models.TextField(blank=True, null=True, default="Default Description")
    upload_date = models.DateTimeField(auto_now_add=True)
    region = models.CharField(max_length=20, default="Default Region")
    area = models.CharField(max_length=20, default="Default Area")
    city = models.CharField(max_length=20, default="Default City")
    age = models.CharField(max_length=20, default="Default Age")

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0) 
    feedback = models.TextField(default="") 

class Homepage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    

