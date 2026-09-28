from django.shortcuts import render

def index(request):
    resultado = None
    erro = None
    num1_input = ""
    num2_input = ""

    if request.method == "POST":
        # Captura os dados do formulário
        num1_input = request.POST.get("num1", "")
        num2_input = request.POST.get("num2", "")
        operacao = request.POST.get("operacao")

        try:
            num1 = float(num1_input)
            num2 = float(num2_input)

            # Executa a operação matemática correspondente
            if operacao == "soma":
                resultado = num1 + num2
            elif operacao == "subtracao":
                resultado = num1 - num2
            elif operacao == "multiplicacao":
                resultado = num1 * num2
            elif operacao == "divisao":
                if num2 == 0:
                    erro = "Divisão por 0 não é permitida"
                else:
                    resultado = num1 / num2

            # Formatação opcional: remove o .0 de números inteiros (ex: 10.0 vira 10)
            if resultado is not None and isinstance(resultado, float) and resultado.is_integer():
                resultado = int(resultado)

        except (ValueError, TypeError):
            erro = "Insira números válidos"

    return render(request, "calculadora/index.html", {
        "resultado": resultado,
        "erro": erro,
        "num1": num1_input,
        "num2": num2_input,
    })