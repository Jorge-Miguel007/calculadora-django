from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import HistoricoCalculo

@admin.register(HistoricoCalculo)
class HistoricoCalculoAdmin(admin.ModelAdmin):
    list_display = ('expressao', 'resultado', 'criado_em')
    search_fields = ('expressao', 'resultado')