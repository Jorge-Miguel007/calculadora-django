from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import HistoricoCalculo

def index(request):
    # Carrega todo o histórico ordenado pelo mais recente
    historico = HistoricoCalculo.objects.all().order_by('-criado_em')
    return render(request, 'calculadora/index.html', {'historico': historico})

@csrf_exempt
def salvar_calculo(request):
    if request.method == 'POST':
        try:
            dados = json.loads(request.body)
            expressao = dados.get('expressao')
            resultado = dados.get('resultado')

            if expressao and resultado:
                # Grava a conta diretamente no PostgreSQL
                HistoricoCalculo.objects.create(
                    expressao=expressao,
                    resultado=resultado
                )
                return JsonResponse({'status': 'sucesso'})
        except Exception as e:
            return JsonResponse({'status': 'erro', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'erro', 'message': 'Método inválido'}, status=400)

@csrf_exempt
def limpar_historico(request):
    if request.method == 'POST':
        # Apaga todo o histórico da tabela
        HistoricoCalculo.objects.all().delete()
        return JsonResponse({'status': 'sucesso'})
    return JsonResponse({'status': 'erro'}, status=400)