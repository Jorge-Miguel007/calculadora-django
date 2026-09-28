import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import HistoricoCalculo

def index(request):
    historico = HistoricoCalculo.objects.all().order_by('-criado_em')
    return render(request, 'calculadora/index.html', {'historico': historico})

@csrf_exempt
def salvar_calculo(request):
    dados = json.loads(request.body)
    HistoricoCalculo.objects.create(
        expressao=dados.get('expressao'),
        resultado=dados.get('resultado')
    )
    return JsonResponse({'status': 'sucesso'})

@csrf_exempt
def limpar_historico(request):
    HistoricoCalculo.objects.all().delete()
    return JsonResponse({'status': 'sucesso'})