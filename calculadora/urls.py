from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('salvar-calculo/', views.salvar_calculo, name='salvar_calculo'), # <--- Esta linha precisa existir
    path('limpar-historico/', views.limpar_historico, name='limpar_historico'),
]