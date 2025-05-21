from django.db import models

class UserPreference(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)  # In real apps, store hashed
    notify_email = models.BooleanField(default=True)
    notify_push = models.BooleanField(default=True)
    notify_frequency = models.CharField(max_length=20, choices=[
        ('immediate', 'Immediate'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly')
    ])
    theme_color = models.CharField(max_length=20, default='light')
    font_size = models.CharField(max_length=20, default='medium')
    layout = models.CharField(max_length=20, default='default')
    profile_visible = models.BooleanField(default=True)
    data_sharing = models.BooleanField(default=True)

    def __str__(self):
        return self.username
