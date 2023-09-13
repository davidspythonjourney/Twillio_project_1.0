# Twillio Project 1.0

## Project Description

The Twillio Project 1.0 is a web application that empowers users to customize text/email messaging campaigns. Leveraging existing messaging APIs like Twilio, this web application allows users to define message content, target audiences (including age, area, etc.), and message frequencies, including recurring messages. This flexibility sets it apart from platforms that offer messaging services without recurring and customizable options.

## Installation

To run the code, you must install the following dependencies:

- Django
- Certifi 
- Crispy-Bootstrap4 
- Crispy-Bootstrap5
- Django-Bootstrap4 
- Django-Crispy-Forms 
- Django-Import-Export
- Pandas
-Celery
-Twillio

### Configuration

After installing Django, ensure that it is configured with proper certificates to enable email settings. Follow these steps(with your version of python):

**For Mac:**

```bash
cd "/Applications/Python 3.11/"
sudo "./Install Certificates.command"
```
**For Windows:**

```
cd "C:\Program Files\Python 3.11\"
.\InstallCertificates.bat

```

# Usage

Before you can interact with the Twilio Project 1.0 on your local server, follow these steps:


**Step 1:** Open Your Terminal
Open your terminal/command prompt.

**Step 2:** Start the Local Server
In your terminal, navigate to the project directory and run the following command to start the local development server:
Replace 'python' with your Python interpreter if needed.
```
python manage.py runserver
```

**Step 3:** Access the Website
Open your web browser and navigate to the locally hosted development website. The default URL is typically http://localhost:8000.

**Step 4:** Account Creation
If you haven't already created an account for testing purposes, you can do so on the platform. This step is necessary to access the platform's features.

**Step 5:** Campaign Selection
Once logged in, navigate to the campaign section within the platform. This is where you'll manage your messaging campaigns.

**Step 6:** Choose a Campaign
 Select a specific campaign that aligns with your messaging needs. This action will automatically redirect you to the dedicated file upload page associated with the chosen campaign.

**Step 7:** File Upload
On the dedicated file upload page, you can upload an Excel spreadsheet containing the message data. Make sure that the uploaded file adheres to the specific format requirements listed on the website. This step is crucial for successful campaign execution.



