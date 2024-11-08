const dt = new Date().toLocaleString();
let jogadas = 0;

document.getElementById("data").innerHTML = ('&copy; Caio Cavalheiro Germano');

function FuncaoAviso() {
    alert('Este é apenas um painel de avisos!');
}

let tabuleiro = Array(10).fill(0);

function jogar(bot) {
    if (tabuleiro[0] != "1" && jogadas < 9) {
        if (tabuleiro[bot] == "0") { /* Verifica se o espaço está vazio */
            document.getElementById(bot).innerHTML = "X";
            tabuleiro[bot] = "X";
            jogadas++;

            if (VerificaVitoria("X")) {
                document.getElementById("data").innerHTML = "Você Ganhou!!";
                tabuleiro[0] = "1";
            } else if (jogadas < 9) {
                RoboJoga();
                if (VerificaVitoria("O")) {
                    document.getElementById("data").innerHTML = "Você Perdeu!!";
                    tabuleiro[0] = "1";
                }
            }
        } else {
            alert("Escolha outra posição!");
        }
    } else { /* Verifica o encerramento do jogo */
        document.getElementById("data").innerHTML = jogadas >= 9 ? "O jogo Empatou!" : "O jogo já acabou!";
        if (jogadas >= 9) alert("O jogo empatou!");
    }
}

function VerificaVitoria(jogador) {
    const combinacoesVencedoras = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], 
        [1, 4, 7], [2, 5, 8], [3, 6, 9], 
        [1, 5, 9], [3, 5, 7]             
    ];

    return combinacoesVencedoras.some(combinacao => 
        combinacao.every(index => tabuleiro[index] == jogador)
    );
}

function RoboJoga() {
    const combinacoesVencedoras = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    // Verifica se a máquina pode vencer
    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] === "O" && tabuleiro[b] === "O" && tabuleiro[c] === "0") {
            tabuleiro[c] = "O";
            document.getElementById(c).innerHTML = "O";
            jogadas++;
            return;
        } else if (tabuleiro[a] === "O" && tabuleiro[c] === "O" && tabuleiro[b] === "0") {
            tabuleiro[b] = "O";
            document.getElementById(b).innerHTML = "O";
            jogadas++;
            return;
        } else if (tabuleiro[b] === "O" && tabuleiro[c] === "O" && tabuleiro[a] === "0") {
            tabuleiro[a] = "O";
            document.getElementById(a).innerHTML = "O";
            jogadas++;
            return;
        }
    }

    // Verifica se o jogador pode vencer e bloqueia
    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] === "X" && tabuleiro[b] === "X" && tabuleiro[c] === "0") {
            tabuleiro[c] = "O";
            document.getElementById(c).innerHTML = "O";
            jogadas++;
            return;
        } else if (tabuleiro[a] === "X" && tabuleiro[c] === "X" && tabuleiro[b] === "0") {
            tabuleiro[b] = "O";
            document.getElementById(b).innerHTML = "O";
            jogadas++;
            return;
        } else if (tabuleiro[b] === "X" && tabuleiro[c] === "X" && tabuleiro[a] === "0") {
            tabuleiro[a] = "O";
            document.getElementById(a).innerHTML = "O";
            jogadas++;
            return;
        }
    }

    // Caso contrário, faz uma jogada aleatória
    if (jogadas < 9) {
        const jogadasPossiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(i => tabuleiro[i] == "0");
        const val = jogadasPossiveis[Math.floor(Math.random() * jogadasPossiveis.length)];
        document.getElementById(val).innerHTML = "O";
        tabuleiro[val] = "O";
        jogadas++;
    }

    // Verifica empate
    if (jogadas >= 9 && !VerificaVitoria("X") && !VerificaVitoria("O")) {
        document.getElementById("data").innerHTML = "O jogo Empatou!";
        alert("O jogo empatou!");
    }
}
