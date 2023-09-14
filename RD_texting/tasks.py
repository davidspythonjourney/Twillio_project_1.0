from celery import shared_task
from RD_texting.models import Campaign, UploadedFile, Contact, Homepage
from django.contrib.auth.models import User
from pytext import message_sender

def celery_tasks():
    users = User.objects.all()
    
    for user_instance in users:
        user_information = Campaign.objects.filter(user=user_instance)
        message_to_send = user_information .value("ad_content")
        
        for campaign in user_information:
            frequency = campaign.frequency
            previous_update = campaign.last_sent
            
            if previous_update <= frequency:
                continue
            
            elif previous_update >= frequency:
                uploaded_file = campaign.uploadedfile  
                for get_info in uploaded_file:
                    
                    phone_number = get_info.phone_number
                    email = get_info.email
                    name = get_info.name
                    message_with_name = f"Hello, {name}!\n{message_to_send}"
            
                    message_sender(phone_number,message_with_name)
                
            
    