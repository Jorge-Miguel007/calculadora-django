from django.shortcuts import render

# Create your views here.


def index(request):
    resultado = None
    erro = None
    if request.method == "POST":
        num1 = request.POST.get(num1)
        num2= request.POST.get(num2)
        operacao = request.POST.get(operacao)
        try: 
            num1 = float(num1)
            num2 = float(num2)
            
            if operacao =='soma' :
                resultado = num1 + num2
            elif operacao == 'subtraçao':
                resultado = num1 - num2
            elif operacao == 'multiplicaçao':
              resultado = num1 * num2
            elif operacao == 'divisao':
                resultado = num1 / num2
                if num2 == 0 :
                     erro = 'divisão por 0 não é permitida' 
                else:
                    resultado == num1/num2       
        except (ValueError, TypeError):
            erro = "insira um numero valido"
    return render(request, 'calculadora/index.html', {'resultado': resultado, 'erro': erro})
    