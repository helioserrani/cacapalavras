// =============================================================
//  LÓGICA DO JOGO
// =============================================================

const NIVEIS = {
  facil:   { nome: "Fácil",   tamanho: 8,  qtdPalavras: 6,  direcoes: [[0, 1], [1, 0]] },
  medio:   { nome: "Médio",   tamanho: 10, qtdPalavras: 8,  direcoes: [[0, 1], [1, 0], [1, 1], [-1, 1]] },
  dificil: { nome: "Difícil", tamanho: 12, qtdPalavras: 10, direcoes: [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]] }
};

const LETRAS = "ABCDEFGHIJLMNOPRSTUVZ"; // letras comuns em português para preencher
const CORES_ACHADAS = ["#fde047", "#86efac", "#93c5fd", "#f9a8d4", "#fdba74", "#c4b5fd", "#5eead4", "#fca5a5"];

const estado = {
  tema: null,
  nivel: "facil",
  grade: [],          // matriz de letras
  palavras: [],       // { texto, chave, celulas, achada }
  selecionando: false,
  inicio: null,       // { l, c }
  inicioToque: null,  // para o modo "tocar primeira e última letra"
  selecao: [],
  segundos: 0,
  relogio: null
};

const el = (id) => document.getElementById(id);

// Tira acentos e deixa em maiúsculas: "Coração" -> "CORACAO"
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z]/g, "").toUpperCase();
}

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ---------------- Tela de temas ----------------

function montarTelaTemas() {
  const lista = el("lista-temas");
  lista.innerHTML = "";
  const grade = document.createElement("div");
  grade.className = "grade-temas";
  TEMAS.forEach((tema) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "cartao-tema";
    botao.style.setProperty("--cor-tema", tema.cor);
    botao.innerHTML = `<span class="emoji">${tema.emoji}</span><span class="nome">${tema.nome}</span>`;
    botao.addEventListener("click", () => iniciarJogo(tema));
    grade.appendChild(botao);
  });
  lista.appendChild(grade);

  el("botoes-dificuldade").querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      estado.nivel = b.dataset.nivel;
      el("botoes-dificuldade").querySelectorAll("button").forEach((x) => x.classList.toggle("ativo", x === b));
    });
  });
}

function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach((t) => t.classList.toggle("escondida", t.id !== id));
  window.scrollTo(0, 0);
}

// ---------------- Geração da grade ----------------

function tentarColocar(grade, chave, direcoes) {
  const n = grade.length;
  for (let tentativa = 0; tentativa < 200; tentativa++) {
    const [dl, dc] = direcoes[Math.floor(Math.random() * direcoes.length)];
    const l0 = Math.floor(Math.random() * n);
    const c0 = Math.floor(Math.random() * n);
    const lFim = l0 + dl * (chave.length - 1);
    const cFim = c0 + dc * (chave.length - 1);
    if (lFim < 0 || lFim >= n || cFim < 0 || cFim >= n) continue;

    const celulas = [];
    let cabe = true;
    for (let i = 0; i < chave.length; i++) {
      const l = l0 + dl * i, c = c0 + dc * i;
      if (grade[l][c] && grade[l][c] !== chave[i]) { cabe = false; break; }
      celulas.push({ l, c });
    }
    if (!cabe) continue;
    celulas.forEach(({ l, c }, i) => (grade[l][c] = chave[i]));
    return celulas;
  }
  return null;
}

// Lembra as palavras das últimas partidas de cada tema (no próprio aparelho),
// para que a próxima partida traga palavras diferentes.
function lerUsadas(tema) {
  try {
    return JSON.parse(localStorage.getItem(`cacapalavras-usadas-${tema.id}`)) || [];
  } catch (e) {
    return [];
  }
}

function salvarUsadas(tema, palavras) {
  // Guarda só o suficiente para não esgotar a lista do tema
  const limite = Math.max(0, tema.palavras.length - 12);
  const usadas = [...palavras.map((p) => p.texto), ...lerUsadas(tema)].slice(0, limite);
  try {
    localStorage.setItem(`cacapalavras-usadas-${tema.id}`, JSON.stringify(usadas));
  } catch (e) {
    // sem memória no aparelho: o sorteio continua funcionando normalmente
  }
}

function gerarJogo(tema, nivel) {
  const { tamanho, qtdPalavras, direcoes } = NIVEIS[nivel];
  const usadas = new Set(lerUsadas(tema));
  const cabem = embaralhar(tema.palavras).filter((p) => normalizar(p).length <= tamanho);
  // Primeiro as palavras que não apareceram nas últimas partidas
  const candidatas = [...cabem.filter((p) => !usadas.has(p)), ...cabem.filter((p) => usadas.has(p))];

  const grade = Array.from({ length: tamanho }, () => Array(tamanho).fill(""));
  const palavras = [];
  for (const texto of candidatas) {
    if (palavras.length >= qtdPalavras) break;
    const chave = normalizar(texto);
    if (palavras.some((p) => p.chave === chave)) continue;
    const celulas = tentarColocar(grade, chave, direcoes);
    if (celulas) palavras.push({ texto, chave, celulas, achada: false });
  }

  for (let l = 0; l < tamanho; l++) {
    for (let c = 0; c < tamanho; c++) {
      if (!grade[l][c]) grade[l][c] = LETRAS[Math.floor(Math.random() * LETRAS.length)];
    }
  }
  palavras.sort((a, b) => a.texto.localeCompare(b.texto, "pt-BR"));
  salvarUsadas(tema, palavras);
  return { grade, palavras };
}

// ---------------- Jogo ----------------

function iniciarJogo(tema) {
  estado.tema = tema;
  const { grade, palavras } = gerarJogo(tema, estado.nivel);
  estado.grade = grade;
  estado.palavras = palavras;
  estado.inicioToque = null;
  estado.selecao = [];

  document.documentElement.style.setProperty("--cor-tema", tema.cor);
  el("titulo-tema").textContent = `${tema.emoji} ${tema.nome} · ${NIVEIS[estado.nivel].nome}`;
  desenharTabuleiro();
  desenharPalavras();
  mostrarTela("tela-jogo");
  iniciarRelogio();
}

function desenharTabuleiro() {
  const tab = el("tabuleiro");
  const n = estado.grade.length;
  tab.style.setProperty("--n", n);
  tab.innerHTML = "";
  estado.grade.forEach((linha, l) => {
    linha.forEach((letra, c) => {
      const cel = document.createElement("div");
      cel.className = "celula";
      cel.textContent = letra;
      cel.dataset.l = l;
      cel.dataset.c = c;
      tab.appendChild(cel);
    });
  });
}

function celulaEm(l, c) {
  return el("tabuleiro").children[l * estado.grade.length + c];
}

function desenharPalavras() {
  const ul = el("lista-palavras");
  ul.innerHTML = "";
  estado.palavras.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = p.texto;
    if (p.achada) li.classList.add("achada");
    ul.appendChild(li);
  });
  const achadas = estado.palavras.filter((p) => p.achada).length;
  el("contador").textContent = `(${achadas}/${estado.palavras.length})`;
}

// Linha reta entre duas células (horizontal, vertical ou diagonal)
function linhaEntre(a, b) {
  const dl = b.l - a.l, dc = b.c - a.c;
  if (dl !== 0 && dc !== 0 && Math.abs(dl) !== Math.abs(dc)) return null;
  const passos = Math.max(Math.abs(dl), Math.abs(dc));
  const sl = Math.sign(dl), sc = Math.sign(dc);
  return Array.from({ length: passos + 1 }, (_, i) => ({ l: a.l + sl * i, c: a.c + sc * i }));
}

function marcarSelecao(celulas) {
  estado.selecao.forEach(({ l, c }) => celulaEm(l, c).classList.remove("selecionada"));
  estado.selecao = celulas || [];
  estado.selecao.forEach(({ l, c }) => celulaEm(l, c).classList.add("selecionada"));
}

function conferirSelecao() {
  const texto = estado.selecao.map(({ l, c }) => estado.grade[l][c]).join("");
  const invertido = [...texto].reverse().join("");
  const palavra = estado.palavras.find((p) => !p.achada && (p.chave === texto || p.chave === invertido));

  if (palavra) {
    palavra.achada = true;
    const indice = estado.palavras.filter((p) => p.achada).length - 1;
    const cor = CORES_ACHADAS[indice % CORES_ACHADAS.length];
    estado.selecao.forEach(({ l, c }) => {
      const cel = celulaEm(l, c);
      cel.classList.add("achada");
      cel.style.background = cor;
    });
    vibrar(40);
    desenharPalavras();
    if (estado.palavras.every((p) => p.achada)) setTimeout(venceu, 400);
  } else if (estado.selecao.length > 1) {
    const tab = el("tabuleiro");
    tab.classList.remove("errou");
    void tab.offsetWidth;
    tab.classList.add("errou");
  }
  marcarSelecao([]);
}

function celulaDoPonto(x, y) {
  const alvo = document.elementFromPoint(x, y);
  if (!alvo || !alvo.classList.contains("celula")) return null;
  return { l: Number(alvo.dataset.l), c: Number(alvo.dataset.c) };
}

function configurarToque() {
  const tab = el("tabuleiro");

  tab.addEventListener("pointerdown", (e) => {
    const cel = celulaDoPonto(e.clientX, e.clientY);
    if (!cel) return;
    e.preventDefault();
    estado.selecionando = true;
    estado.inicio = cel;
    estado.arrastou = false;
    if (estado.inicioToque) {
      marcarSelecao(linhaEntre(estado.inicioToque, cel) || [cel]);
    } else {
      marcarSelecao([cel]);
    }
  });

  window.addEventListener("pointermove", (e) => {
    if (!estado.selecionando) return;
    const cel = celulaDoPonto(e.clientX, e.clientY);
    if (!cel) return;
    if (cel.l !== estado.inicio.l || cel.c !== estado.inicio.c) {
      estado.arrastou = true;
      estado.inicioToque = null;
    }
    const linha = linhaEntre(estado.inicio, cel);
    if (linha) marcarSelecao(linha);
  });

  window.addEventListener("pointerup", () => {
    if (!estado.selecionando) return;
    estado.selecionando = false;

    if (estado.arrastou) {
      conferirSelecao();
      return;
    }

    // Foi só um toque: modo "primeira letra, depois última letra"
    const cel = estado.inicio;
    if (!estado.inicioToque) {
      estado.inicioToque = cel;
      celulaEm(cel.l, cel.c).classList.add("selecionada");
    } else if (estado.inicioToque.l === cel.l && estado.inicioToque.c === cel.c) {
      estado.inicioToque = null;
      marcarSelecao([]);
    } else {
      const linha = linhaEntre(estado.inicioToque, cel);
      estado.inicioToque = null;
      if (linha) {
        marcarSelecao(linha);
        conferirSelecao();
      } else {
        marcarSelecao([]);
      }
    }
  });
}

// ---------------- Relógio e vitória ----------------

function formatarTempo(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function iniciarRelogio() {
  clearInterval(estado.relogio);
  estado.segundos = 0;
  el("cronometro").textContent = "00:00";
  estado.relogio = setInterval(() => {
    estado.segundos++;
    el("cronometro").textContent = formatarTempo(estado.segundos);
  }, 1000);
}

function venceu() {
  clearInterval(estado.relogio);
  el("vitoria-texto").textContent =
    `Você achou todas as ${estado.palavras.length} palavras de "${estado.tema.nome}" em ${formatarTempo(estado.segundos)}.`;
  el("vitoria").classList.remove("escondida");
  vibrar([60, 40, 60]);
}

function vibrar(padrao) {
  if (navigator.vibrate) navigator.vibrate(padrao);
}

// ---------------- Botões ----------------

el("voltar").addEventListener("click", () => {
  clearInterval(estado.relogio);
  mostrarTela("tela-temas");
});
el("novo-jogo").addEventListener("click", () => iniciarJogo(estado.tema));
el("jogar-de-novo").addEventListener("click", () => {
  el("vitoria").classList.add("escondida");
  iniciarJogo(estado.tema);
});
el("trocar-tema").addEventListener("click", () => {
  el("vitoria").classList.add("escondida");
  mostrarTela("tela-temas");
});

montarTelaTemas();
configurarToque();
