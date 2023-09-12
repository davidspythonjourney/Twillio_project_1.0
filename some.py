from django.shortcuts import render

def campaign_view(request):
    return render(request, 'campaign.html')
    path('campaign/', views.campaign_view, name='campaign_view'),
