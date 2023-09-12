from django.urls import path
from . import views

urlpatterns = [
    path('main/', views.home, name="RD_texting-main"),
    path('contact/', views.contact, name="RD_texting-contact"),
    path('campaign/', views.campaign, name="RD_texting-campaign"),
    path('upload/', views.upload , name="upload"),
    

]
