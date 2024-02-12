from twilio.rest import Client
from dotenv import load_dotenv
import os
import django
from django.conf import settings
from django.core.mail import send_mail
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
django.setup()
load_dotenv()

account_sid = os.environ.get('TWIL_SID')
auth_token = os.environ.get('TWIL_AUTH_TOKEN')

client = Client(account_sid, auth_token)

def message_sender(phone_num: int, content: str):
    message = client.messages.create(
        to=phone_num,
        from_="",  # Replace with your Twilio phone number in string format
        body=content
    )
    
    
def email_sender(email: str, name: str, content: str):
    
    receiver = [email]
    subject = "RD_texting messaging campaign"
    from_email = settings.EMAIL_HOST_USER
    person = name
    message = content
    

    send_mail(subject, message, from_email, receiver)
    
#provide email and phone to sent to/from 
email = ""
phomne_num = ""
email_sender(email, "david", "it works!")

message_sender(phomne_num , "Hi Roi this is RD texting, how are you!")

