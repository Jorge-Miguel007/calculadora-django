document.addEventListener("DOMContentLoaded", function() {
    const botoes = document.querySelectorAll(".numero");
    const display = document.getElementById("display");
    const btnTema = document.getElementById("toggle-theme");

    // Função responsável por enviar os dados para o Django e atualizar a tela
    function salvarNoBanco(expressao, resultado) {
        fetch('/salvar-calculo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                expressao: expressao,
                resultado: resultado
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Salvo com sucesso no PostgreSQL:', data);
            
            // Adiciona o novo item no topo da lista de histórico sem precisar dar F5
            const listaHistorico = document.querySelector(".historico-lista, ul");
            if (listaHistorico) {
                const novoItem = document.createElement("li");
                novoItem.innerText = `${expressao} = ${resultado}`;
                listaHistorico.insertBefore(novoItem, listaHistorico.firstChild);
            }
        })
        .catch(error => console.error('Erro ao salvar:', error));
    }

    // --- Troca de Tema (Claro/Escuro) ---
    if (btnTema) {
        const temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "dark") {
            document.body.classList.add("dark-theme");
            btnTema.innerText = "💡 Modo Claro";
        } else {
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
                        const expressaoOriginal = valorAtual;
                        
                        // Calcula e converte para texto
                        const resultadoCalculado = String(Function(`"use strict"; return (${valorAtual})`)());

                        // Atualiza o visor imediatamente
                        display.innerText = resultadoCalculado;
                        
                        // Envia para o banco PostgreSQL
                        salvarNoBanco(expressaoOriginal, resultadoCalculado);

                        // Prepara o valorAtual com o resultado para a próxima conta
                        valorAtual = resultadoCalculado;
                    }
                } catch (e) {
                    display.innerText = "Erro";
                    valorAtual = "";
                }
                return;
            }

            // Tratamento para não acumular '0' no início ou sobresscrever após 'Erro'
            if ((textoDisplayAtual === "0" || textoDisplayAtual === "Erro") && !isNaN(texto)) {
                valorAtual = texto;
            } else {
                valorAtual += texto;
            }

            display.innerText = valorAtual;
        });
    });
});