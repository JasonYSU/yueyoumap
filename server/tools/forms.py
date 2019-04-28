from django import forms


class UploadRecognizeFileForm(forms.Form):
    """识植物上传图片表单"""
    image = forms.FileField()
