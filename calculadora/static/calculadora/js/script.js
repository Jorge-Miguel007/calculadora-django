document.addEventListener("DOMContentLoaded", function() {
    const botoes = document.querySelectorAll(".numero");
    const display = document.getElementById("display");
    const btnTema = document.getElementById("toggle-theme");

    // --- Lógica de Troca de Tema (Claro/Escuro) ---
    if (btnTema) {
        const temaSalvo = localStorage.getItem("tema");
        if (temaSalvo === "dark") {
            document.body.classList.add("dark-theme");
        }

        btnTema.addEventListener("click", function() {
            document.body.classList.toggle("dark-theme");
            if (document.body.classList.contains("dark-theme")) {
                btnTema.innerText = "💡 Modo Claro";
                localStorage.setItem("tema", "dark");
            } else {
                btnTema.innerText = "🔌 Modo Escuro";
                localStorage.setItem("tema", "light");
            }
        });
    }

    // --- Lógica da Calculadora ---
    let valorAtual = "";

    botoes.forEach(function(botao) {
        botao.addEventListener("click", function() {
            const texto = botao.innerText.trim();
            const textoDisplayAtual = display.innerText.trim();

            // Botão Limpar (C)
            if (texto === "C") {
                valorAtual = "";
                display.innerText = "0";
                return;
            }

            // Botão Igual (=)
            if (texto === "=") {
                try {
                    if (valorAtual !== "") {
                        valorAtual = eval(valorAtual).toString();
                        display.innerText = valorAtual;
                    }
                } catch (e) {
                    display.innerText = "Erro"; // Padronizado para "Erro"
                    valorAtual = "";
                }
                return;
            }

            // Se o visor estiver com "0" ou "Erro", substitui pelo novo número digitado
            if ((textoDisplayAtual === "0" || textoDisplayAtual === "Erro") && !isNaN(texto)) {
                valorAtual = texto;
            } else {
                valorAtual += texto;
            }

            // Atualiza o texto visível na barra da calculadora
            display.innerText = valorAtual;
        });
    });
});