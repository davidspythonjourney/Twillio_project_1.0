# Generated by Django 4.2.4 on 2023-09-13 19:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('RD_texting', '0005_alter_uploadedfile_email_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='campaign',
            name='location',
        ),
        migrations.RemoveField(
            model_name='uploadedfile',
            name='user',
        ),
        migrations.AddField(
            model_name='campaign',
            name='area',
            field=models.CharField(default='Default Area', max_length=20),
        ),
        migrations.AddField(
            model_name='campaign',
            name='city',
            field=models.CharField(default='Default City', max_length=20),
        ),
        migrations.AddField(
            model_name='campaign',
            name='last_sent',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='uploadedfile',
            name='age',
            field=models.CharField(default='Default Age', max_length=20),
        ),
        migrations.AddField(
            model_name='uploadedfile',
            name='area',
            field=models.CharField(default='Default Area', max_length=20),
        ),
        migrations.AddField(
            model_name='uploadedfile',
            name='campaign',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='RD_texting.campaign'),
        ),
        migrations.AddField(
            model_name='uploadedfile',
            name='city',
            field=models.CharField(default='Default City', max_length=20),
        ),
        migrations.AddField(
            model_name='uploadedfile',
            name='region',
            field=models.CharField(default='Default Region', max_length=20),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='frequency_in_hours',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='uploadedfile',
            name='email',
            field=models.CharField(default='example@example.com', max_length=255),
        ),
        migrations.AlterField(
            model_name='uploadedfile',
            name='phone_number',
            field=models.PositiveIntegerField(default=123456789),
        ),
        migrations.CreateModel(
            name='Homepage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('company_name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=15)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.PositiveIntegerField(default=0)),
                ('feedback', models.TextField(default='')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
