from django import forms

class AdDetailsForm(forms.Form):
    location = forms.MultipleChoiceField(
        required=False,
        choices=[
            ('North', 'North'),
            ('South', 'South'),
            ('Central', 'Central'),
        ],
        widget=forms.CheckboxSelectMultiple,
    )
    age_group = forms.MultipleChoiceField(
        required=False,
        choices=[
            ('14-17', '14-17'),
            ('18-24', '18-24'),
            ('25-29', '25-29'),
            ('30+', '30+'),
        ],
        widget=forms.CheckboxSelectMultiple,
    )
    audience_size = forms.ChoiceField(
        required=False,
        choices=[
            ('1K-10K', '1K-10K'),
            ('10K-25K', '10K-25K'),
            ('25K-50K', '25K-50K'),
            ('50K-100K', '50K-100K'),
            ('100K+', '100K+'),
        ],
        widget=forms.RadioSelect,
    )
    ad_title = forms.CharField(max_length=100)
    ad_content = forms.CharField(widget=forms.Textarea(attrs={'rows': 5}))
