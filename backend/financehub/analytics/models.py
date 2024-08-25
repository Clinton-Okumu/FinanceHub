from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class AnalyticsResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    result_type = models.CharField(max_length=255)
    result_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
