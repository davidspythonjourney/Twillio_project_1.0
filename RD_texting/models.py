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
    location = models.CharField(max_length=20, default="Default Location")
    age_group = models.CharField(max_length=20, default="Default Age Group")
    audience_size = models.CharField(max_length=20, default="Default Audience Size")

    frequency_in_hours = models.PositiveIntegerField(
        default=24,
        help_text="Set the frequency in hours (e.g., 24 for once a day, 1 for once an hour)."
    )

class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    phone_number = models.PositiveIntegerField(default=123456789, unique=True)  
    email = models.CharField(max_length=255, default="example@example.com", unique=True)  
    name = models.CharField(max_length=255, default="Default Name")  
    description = models.TextField(blank=True, null=True, default="Default Description")
    upload_date = models.DateTimeField(auto_now_add=True)

    

