document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleção dos elementos do HTML
    const display = document.getElementById("display");
    const botoes = document.querySelectorAll(".numero");
    const btnTema = document.getElementById("toggle-theme");
    const btnLimpar = document.getElementById("btn-limpar-historico");

    let valorAtual = "";

    // 2. Apagar o histórico no banco de dados (Django)
    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            fetch("/limpar-historico/", { method: "POST" })
                .then(() => window.location.reload());
        });
    }

    // 3. Salvar uma nova conta no banco de dados
    function salvarNoBanco(expressao, resultado) {
        fetch("/salvar-calculo/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expressao: expressao, resultado: resultado })
        });
    }

    // 4. Trocar o tema (Claro / Escuro)
    if (btnTema) {
        btnTema.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
        });
    }

    // 5. Lógica dos cliques nos botões da calculadora
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const texto = botao.innerText.trim();

            // Botão C (Limpar visor)
            if (texto === "C") {
                valorAtual = "";
                display.innerText = "0";
                return;
            }

            // Botão = (Calcular resultado)
            if (texto === "=") {
                try {
                    const resultado = eval(valorAtual); // Faz a conta matemática
                    display.innerText = resultado;
                    salvarNoBanco(valorAtual, resultado); // Manda para o Django
                    valorAtual = String(resultado);
                } catch {
                    display.innerText = "Erro";
                    valorAtual = "";
                }
                return;
            }

            // Digitar números e operadores
            if (display.innerText === "0" || display.innerText === "Erro") {
                valorAtual = texto;
            } else {
                valorAtual += texto;
            }

            display.innerText = valorAtual;
        });
    });
});