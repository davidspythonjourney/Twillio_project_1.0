from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
import os
import datetime
from .forms import AdDetailsForm
from .models import UploadedFile
import pandas as pd



# Create your views here.
#views are used to return the desired content


def home(request):
    return render(request, 'RD_texting/main.html')

#makes us unable to view a page unless logged in
@login_required
def contact(request):
    return render(request, 'RD_texting/contact.html')

@login_required
def campaign(request):
    if request.method == 'POST':
        form = AdDetailsForm(request.POST)
        if form.is_valid():
            return redirect('upload')  # Change 'success-page' to your desired URL
    else:
        form = AdDetailsForm()

    return render(request, 'RD_texting/campaign.html', {'form': form})  # Render the campaign.html template


@login_required
def upload(request):
    required_columns = ['phone_number', 'email', 'name']
    if request.method == 'POST':
        uploaded_file = request.FILES.get('document')

        if not uploaded_file:
            return render(request, "RD_texting/upload.html", {'error_message': 'No file selected for upload.'})

        allowed_extensions = ['.csv', '.xlsx', '.xls']
        file_extension = os.path.splitext(uploaded_file.name)[1].lower()

        if file_extension not in allowed_extensions:
            return render(request, "RD_texting/upload.html", {'error_message': 'Invalid file format. Please upload a CSV or Excel file.'})
        
        try:
            df = pd.read_excel(uploaded_file)
            
            # Check for required columns
            missing_columns = [col for col in required_columns if col.lower() not in map(str.lower, df.columns)]
            if missing_columns:
                missing_columns_str = ', '.join(missing_columns)
                error_message = f'Required columns are missing in the uploaded file: {missing_columns_str}.'
                return render(request, "RD_texting/upload.html", {'error_message': error_message})
            
            data_to_save = df[required_columns]

            for _, row in data_to_save.iterrows():
                UploadedFile.objects.create(
                    user=request.user,
                    phone_number=row['phone_number'],
                    email=row['email'],
                    name=row['name'],
                    description=request.POST.get('description'),
                    upload_date=datetime.datetime.now(),
                )
            
            return redirect('RD_texting-main') 
        except Exception as e:
            error_message = f'Error processing the file: {str(e)}'
            return render(request, "RD_texting/upload.html", {'error_message': error_message})

    return render(request, "RD_texting/upload.html")

 



# def ad_details_view(request):
#     if request.method == 'POST':
#         form = AdDetailsForm(request.POST)
#         if form.is_valid():
#             return redirect('')  # Change 'success-page' to your desired URL
#     else:
#         form = AdDetailsForm()

#     return render(request, 'RD_texting/campaign.html', {'form': form})  # Render the campaign.html template














