document.addEventListener("DOMContentLoaded", function() {
    const botoes = document.querySelectorAll(".numero");
    const display = document.getElementById("display");
    const btnTema = document.getElementById("toggle-theme");

    // --- Troca de Tema (Claro/Escuro) ---
    if (btnTema) {
        const temaSalvo = localStorage.getItem("tema");

        // Sincroniza a classe do body e o texto do botão com o que está no localStorage
        if (temaSalvo === "dark") {
            document.body.classList.add("dark-theme");
            btnTema.innerText = "💡 Modo Claro";
        } else {
            // Se for 'light' ou se for a PRIMEIRA vez abrindo o site (temaSalvo === null)
            document.body.classList.remove("dark-theme");
            btnTema.innerText = "🔌 Modo Escuro";
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

            if (texto === "C") {
                valorAtual = "";
                display.innerText = "0";
                return;
            }

            if (texto === "=") {
                try {
                    if (valorAtual !== "") {
                        valorAtual = eval(valorAtual).toString();
                        display.innerText = valorAtual;
                    }
                } catch (e) {
                    display.innerText = "Erro";
                    valorAtual = "";
                }
                return;
            }

            if ((textoDisplayAtual === "0" || textoDisplayAtual === "Erro") && !isNaN(texto)) {
                valorAtual = texto;
            } else {
                valorAtual += texto;
            }

            display.innerText = valorAtual;
        });
    });
});