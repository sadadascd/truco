/*
 * PERSONAGENS: OMI TOWER DEFENSE (POTW)
 * Autor: Felipe (9C - Computação)
 * Jogo educacional de Pensamento Lógico com sistema de sorteio (summon) e vantagens elementais.
 */
(function () {
  "use strict";

  // Catálogo completo de Guardiões disponíveis para sorteio (Summon)
  var GUARDIOES_CATALOGO = [
    {
      id: "agua",
      nome: "Maré Azul",
      elemento: "Água",
      emoji: "💧",
      raridade: "Comum",
      habilidade: "Vence Fogo e completa sequências de Água (+100 pts)",
      bonusPontos: 100,
    },
    {
      id: "fogo",
      nome: "Igni",
      elemento: "Fogo",
      emoji: "🔥",
      raridade: "Comum",
      habilidade: "Vence Planta e derrete barreiras de Gelo (+100 pts)",
      bonusPontos: 100,
    },
    {
      id: "planta",
      nome: "Broto Vivo",
      elemento: "Planta",
      emoji: "🌿",
      raridade: "Raro",
      habilidade: "Absorve Água e cura +5% da Base ao acertar (+130 pts)",
      bonusPontos: 130,
      curaBase: 5,
    },
    {
      id: "raio",
      nome: "Volt Omi",
      elemento: "Raio",
      emoji: "⚡",
      raridade: "Epico",
      habilidade: "Anula escudos mecânicos e dá pontos extras (+160 pts)",
      bonusPontos: 160,
    },
    {
      id: "estrela",
      nome: "Orbe Cósmico",
      elemento: "Cósmico",
      emoji: "🌟",
      raridade: "Lendario",
      habilidade: "Mestre da Lógica: bônus máximo e recupera +10% da Base (+220 pts)",
      bonusPontos: 220,
      curaBase: 10,
    },
  ];

  // As 8 ondas do jogo com cenários variados e desafios de pensamento lógico
  var ONDAS = [
    {
      numero: 1,
      temaClasse: "theme-floresta",
      bioma: "🌲 Floresta Ancestral",
      inimigoNome: "Chama Rubra",
      inimigoEmoji: "🔥",
      tipoDesafio: "Regra SE... ENTÃO",
      pergunta: "SE o invasor é do elemento FOGO, ENTÃO qual elemento causa dano extra para detê-lo?",
      corretaId: "agua",
      explicacaoAcerto: "Isso! Água apaga o Fogo e causa dano crítico na defesa.",
      explicacaoErro: "Quase! Pela regra elemental, apenas Água tem vantagem direta contra Fogo.",
    },
    {
      numero: 2,
      temaClasse: "theme-floresta",
      bioma: "🌲 Floresta Ancestral",
      inimigoNome: "Golem de Musgo",
      inimigoEmoji: "🌿",
      tipoDesafio: "Regra SE... ENTÃO",
      pergunta: "SE o inimigo é feito de PLANTA seca, ENTÃO qual guardião deve entrar na pista?",
      corretaId: "fogo",
      explicacaoAcerto: "Perfeito! Fogo tem vantagem elemental contra Planta.",
      explicacaoErro: "Atenção à regra: Planta é fraca contra Fogo, não contra outros elementos.",
    },
    {
      numero: 3,
      temaClasse: "theme-vulcao",
      bioma: "🌋 Vulcão Ardente",
      inimigoNome: "Onda Tóxica",
      inimigoEmoji: "🌊",
      tipoDesafio: "Sequência Lógica",
      pergunta: "Complete o padrão lógico de defesa: Fogo ➔ Água ➔ Planta ➔ Fogo ➔ Água ➔ [ ? ]",
      corretaId: "planta",
      explicacaoAcerto: "Muito bem! A sequência repete o ciclo Fogo, Água e Planta.",
      explicacaoErro: "Observe o ciclo que se repete de 3 em 3: depois de Fogo e Água vem Planta.",
    },
    {
      numero: 4,
      temaClasse: "theme-vulcao",
      bioma: "🌋 Vulcão Ardente",
      inimigoNome: "Titã de Magma",
      inimigoEmoji: "🌋",
      tipoDesafio: "Condição Composta (E)",
      pergunta: "SE o invasor vem do Vulcão E solta faíscas de FOGO, ENTÃO qual guardião bloqueia o ataque?",
      corretaId: "agua",
      explicacaoAcerto: "Exato! As duas condições apontam para a fraqueza ao elemento Água.",
      explicacaoErro: "Na condição 'E', as duas pistas confirmam um inimigo de Fogo. Use Água!",
    },
    {
      numero: 5,
      temaClasse: "theme-laboratorio",
      bioma: "🔬 Laboratório Omi",
      inimigoNome: "Drone Blindado",
      inimigoEmoji: "🤖",
      tipoDesafio: "Regra de Negação (NÃO)",
      pergunta: "O Drone é imune a Fogo, Água e Planta. SE NÃO é nenhum desses três, ENTÃO qual guardião funciona?",
      corretaId: "raio",
      explicacaoAcerto: "Boa dedução! Eliminando Fogo, Água e Planta, sobra o ataque de Raio.",
      explicacaoErro: "Leia a negação: ele é imune a Fogo, Água e Planta. Sobrou apenas Raio!",
    },
    {
      numero: 6,
      temaClasse: "theme-gelo",
      bioma: "❄️ Geleira Cristalina",
      inimigoNome: "Sentinela Glacial",
      inimigoEmoji: "🧊",
      tipoDesafio: "Sequência Alternada",
      pergunta: "Descubra o próximo elemento da fila: Raio ➔ Fogo ➔ Raio ➔ Fogo ➔ [ ? ]",
      corretaId: "raio",
      explicacaoAcerto: "Acertou! A sequência alterna entre Raio e Fogo, então a vez é do Raio.",
      explicacaoErro: "Note a alternância simples: Raio, Fogo, Raio, Fogo... o próximo é Raio.",
    },
    {
      numero: 7,
      temaClasse: "theme-gelo",
      bioma: "❄️ Geleira Cristalina",
      inimigoNome: "Hidra Congelada",
      inimigoEmoji: "🐉",
      tipoDesafio: "Sequência de Pares",
      pergunta: "Qual elemento completa o padrão duplo: Água, Água, Planta, Planta, Fogo, [ ? ]",
      corretaId: "fogo",
      explicacaoAcerto: "Excelente! Cada elemento aparece duas vezes seguidas na sequência.",
      explicacaoErro: "Cada elemento está em dupla: duas Águas, duas Plantas, então faltava o segundo Fogo.",
    },
    {
      numero: 8,
      temaClasse: "theme-espaco",
      bioma: "🌌 Dimensão Omi",
      inimigoNome: "Chefe Supremo Omi",
      inimigoEmoji: "👾",
      tipoDesafio: "Desafio Final de Lógica",
      pergunta: "SE Fogo vence Planta, Água vence Fogo e Raio vence Drone, ENTÃO quem derrota a energia Cósmica do Chefe?",
      corretaId: "estrela",
      explicacaoAcerto: "Vitória épica! O Orbe Cósmico dominou a lógica final e salvou a Base!",
      explicacaoErro: "O Chefe final exige o poder equivalente de nível Cósmico para neutralizar o ataque.",
    },
  ];

  // Estado atual da partida
  var estado = {
    ondaAtual: 0,
    vidaBase: 100,
    pontos: 0,
    inicioTempo: null,
    timerId: null,
    terminou: false,
    bloqueado: false,
    equipeIds: ["agua", "fogo"], // Começa com 2 guardiões básicos para já ter escolha na 1ª onda
    proximoSorteioId: null,
  };

  // Referências dos elementos da tela
  var els = {
    wave: document.getElementById("wave"),
    totalWaves: document.getElementById("total-waves"),
    baseHp: document.getElementById("base-hp"),
    score: document.getElementById("score"),
    timer: document.getElementById("timer"),
    arena: document.getElementById("arena"),
    biomeBadge: document.getElementById("biome-badge"),
    enemyBadge: document.getElementById("enemy-badge"),
    enemyEmoji: document.getElementById("enemy-emoji"),
    enemyName: document.getElementById("enemy-name"),
    defenderSlot: document.getElementById("defender-slot"),
    defenderEmoji: document.getElementById("defender-emoji"),
    defenderName: document.getElementById("defender-name"),
    logicType: document.getElementById("logic-type"),
    logicPrompt: document.getElementById("logic-prompt"),
    feedback: document.getElementById("feedback"),
    teamCount: document.getElementById("team-count"),
    cardsGrid: document.getElementById("cards-grid"),
    restart: document.getElementById("restart"),
    summonModal: document.getElementById("summon-modal"),
    summonOrb: document.getElementById("summon-orb"),
    summonStatus: document.getElementById("summon-status"),
    btnSummon: document.getElementById("btn-summon"),
    btnNextWave: document.getElementById("btn-next-wave"),
    result: document.getElementById("result"),
    resultIcon: document.getElementById("result-icon"),
    resultTitle: document.getElementById("result-title"),
    resultText: document.getElementById("result-text"),
    playAgain: document.getElementById("play-again"),
  };

  // 1. Contrato com o portal: avisa que o jogo carregou
  window.parent.postMessage({ type: "vrgame:ready" }, "*");

  function buscarGuardiao(id) {
    for (var i = 0; i < GUARDIOES_CATALOGO.length; i++) {
      if (GUARDIOES_CATALOGO[i].id === id) {
        return GUARDIOES_CATALOGO[i];
      }
    }
    return GUARDIOES_CATALOGO[0];
  }

  function formatarTempo(ms) {
    return (ms / 1000).toFixed(1).replace(".", ",") + "s";
  }

  function iniciarCronometro() {
    if (estado.inicioTempo) return;
    estado.inicioTempo = Date.now();
    estado.timerId = window.setInterval(function () {
      els.timer.textContent = formatarTempo(Date.now() - estado.inicioTempo);
    }, 100);
  }

  function pararCronometro() {
    if (estado.timerId) {
      window.clearInterval(estado.timerId);
      estado.timerId = null;
    }
  }

  function atualizarHud() {
    els.wave.textContent = String(Math.min(estado.ondaAtual + 1, ONDAS.length));
    els.totalWaves.textContent = String(ONDAS.length);
    els.baseHp.textContent = String(estado.vidaBase);
    els.score.textContent = String(estado.pontos);
    els.teamCount.textContent = estado.equipeIds.length + "/" + GUARDIOES_CATALOGO.length + " Guardiões";
  }

  function desenharEquipe() {
    els.cardsGrid.innerHTML = "";

    for (var i = 0; i < estado.equipeIds.length; i++) {
      var g = buscarGuardiao(estado.equipeIds[i]);
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "guardian-card";
      botao.disabled = estado.bloqueado || estado.terminou;
      botao.setAttribute("aria-label", "Posicionar " + g.nome + " (" + g.elemento + ")");

      botao.innerHTML =
        '<div class="card-top">' +
        '<span class="card-emoji">' + g.emoji + "</span>" +
        '<span class="rarity-tag rarity-' + g.raridade + '">' + g.raridade + "</span>" +
        "</div>" +
        '<div class="card-name">' + g.nome + " (" + g.elemento + ")</div>" +
        '<div class="card-skill">' + g.habilidade + "</div>";

      (function (guardiaoEscolhido) {
        botao.addEventListener("click", function () {
          jogarTurno(guardiaoEscolhido);
        });
      })(g);

      els.cardsGrid.appendChild(botao);
    }
  }

  function carregarOnda() {
    var onda = ONDAS[estado.ondaAtual];
    estado.bloqueado = false;

    // Garante que o guardião necessário para a onda esteja na equipe do jogador
    if (estado.equipeIds.indexOf(onda.corretaId) === -1) {
      estado.equipeIds.push(onda.corretaId);
    }

    // Troca o tema visual da arena conforme a fase
    els.arena.className = "arena " + onda.temaClasse;
    els.biomeBadge.textContent = onda.bioma;
    els.enemyBadge.textContent = "Invasor: " + onda.inimigoNome + " " + onda.inimigoEmoji;
    els.enemyEmoji.textContent = onda.inimigoEmoji;
    els.enemyName.textContent = onda.inimigoNome;

    // Reseta o espaço do defensor na pista
    els.defenderSlot.classList.remove("active");
    els.defenderEmoji.textContent = "🛡️";
    els.defenderName.textContent = "Escolha abaixo";

    // Preenche o desafio lógico
    els.logicType.textContent = onda.tipoDesafio;
    els.logicPrompt.textContent = onda.pergunta;

    els.feedback.hidden = true;
    els.feedback.className = "feedback";

    atualizarHud();
    desenharEquipe();
    reportarAltura();
  }

  function mostrarFeedback(acertou, texto) {
    els.feedback.hidden = false;
    els.feedback.className = "feedback " + (acertou ? "is-correct" : "is-wrong");
    els.feedback.textContent = (acertou ? "✅ " : "❌ ") + texto;
    reportarAltura();
  }

  function jogarTurno(guardiao) {
    if (estado.bloqueado || estado.terminou) return;
    iniciarCronometro();

    var onda = ONDAS[estado.ondaAtual];
    estado.bloqueado = true;
    desenharEquipe();

    // Mostra o guardião posicionado na pista
    els.defenderSlot.classList.add("active");
    els.defenderEmoji.textContent = guardiao.emoji;
    els.defenderName.textContent = guardiao.nome;

    if (guardiao.id === onda.corretaId) {
      // Acertou a lógica da onda
      estado.pontos += guardiao.bonusPontos;
      if (guardiao.curaBase) {
        estado.vidaBase = Math.min(100, estado.vidaBase + guardiao.curaBase);
      }
      atualizarHud();
      mostrarFeedback(true, onda.explicacaoAcerto + " (+" + guardiao.bonusPontos + " pts)");

      window.setTimeout(function () {
        avancarDepoisDaOnda();
      }, 1400);
    } else {
      // Errou a lógica: inimigo ataca a base
      estado.vidaBase = Math.max(0, estado.vidaBase - 35);
      atualizarHud();
      mostrarFeedback(false, onda.explicacaoErro + " (-35% de vida na Base)");

      if (estado.vidaBase <= 0) {
        window.setTimeout(function () {
          finalizarJogo(false);
        }, 1400);
      } else {
        // Permite tentar novamente na mesma onda após ler a explicação
        window.setTimeout(function () {
          estado.bloqueado = false;
          els.defenderSlot.classList.remove("active");
          els.defenderEmoji.textContent = "🛡️";
          els.defenderName.textContent = "Tente de novo";
          desenharEquipe();
        }, 1600);
      }
    }
  }

  function avancarDepoisDaOnda() {
    var proximaIndex = estado.ondaAtual + 1;

    // Se venceu a última onda (8), encerra com vitória
    if (proximaIndex >= ONDAS.length) {
      finalizarJogo(true);
      return;
    }

    // Verifica se há um novo guardião para desbloquear no portal de sorteio
    var proximaOnda = ONDAS[proximaIndex];
    var idParaSortear = null;

    if (estado.equipeIds.indexOf(proximaOnda.corretaId) === -1) {
      idParaSortear = proximaOnda.corretaId;
    } else {
      // Procura qualquer guardião ainda não desbloqueado
      for (var i = 0; i < GUARDIOES_CATALOGO.length; i++) {
        if (estado.equipeIds.indexOf(GUARDIOES_CATALOGO[i].id) === -1) {
          idParaSortear = GUARDIOES_CATALOGO[i].id;
          break;
        }
      }
    }

    if (idParaSortear) {
      abrirModalSorteio(idParaSortear);
    } else {
      estado.ondaAtual = proximaIndex;
      carregarOnda();
    }
  }

  function abrirModalSorteio(idGuardiao) {
    estado.proximoSorteioId = idGuardiao;
    els.summonOrb.textContent = "💎";
    els.summonStatus.textContent = "Cristal carregado! Clique para invocar.";
    els.btnSummon.hidden = false;
    els.btnSummon.disabled = false;
    els.btnNextWave.hidden = true;
    els.summonModal.hidden = false;
  }

  function executarSorteio() {
    els.btnSummon.disabled = true;
    els.summonStatus.textContent = "Invocando guardião no portal...";

    var passos = 0;
    var roleta = window.setInterval(function () {
      var aleatorio = GUARDIOES_CATALOGO[passos % GUARDIOES_CATALOGO.length];
      els.summonOrb.textContent = aleatorio.emoji;
      passos++;

      if (passos >= 8) {
        window.clearInterval(roleta);
        var ganho = buscarGuardiao(estado.proximoSorteioId);
        if (estado.equipeIds.indexOf(ganho.id) === -1) {
          estado.equipeIds.push(ganho.id);
        }

        els.summonOrb.textContent = ganho.emoji;
        els.summonStatus.textContent =
          "[" + ganho.raridade.toUpperCase() + "] " + ganho.nome + " (" + ganho.elemento + ") entrou para sua equipe!";
        els.btnSummon.hidden = true;
        els.btnNextWave.hidden = false;
        atualizarHud();
      }
    }, 90);
  }

  function finalizarJogo(venceu) {
    estado.terminou = true;
    pararCronometro();

    var tempoMs = estado.inicioTempo ? Date.now() - estado.inicioTempo : 0;
    var pontuacaoMaxima = 1200;

    els.resultIcon.textContent = venceu ? "🏆" : "💥";
    els.resultTitle.textContent = venceu ? "Base Protegida!" : "A Base Caiu!";
    els.resultText.textContent = venceu
      ? "Parabéns! Você venceu as 8 ondas de lógica com " +
        estado.pontos +
        " pontos em " +
        formatarTempo(tempoMs) +
        "."
      : "Os invasores romperam as defesas na onda " +
        (estado.ondaAtual + 1) +
        ". Você fez " +
        estado.pontos +
        " pontos. Tente novamente!";

    els.result.hidden = false;

    // 2. Contrato com o portal: envia o resultado final
    window.parent.postMessage(
      {
        type: "vrgame:finish",
        score: estado.pontos,
        maxScore: pontuacaoMaxima,
        timeMs: tempoMs,
        detail: { jogo: "personagens-omi-tower-defense" },
      },
      "*"
    );
  }

  function reiniciarJogo() {
    pararCronometro();
    estado.ondaAtual = 0;
    estado.vidaBase = 100;
    estado.pontos = 0;
    estado.inicioTempo = null;
    estado.terminou = false;
    estado.bloqueado = false;
    estado.equipeIds = ["agua", "fogo"];
    estado.proximoSorteioId = null;

    els.timer.textContent = "0,0s";
    els.result.hidden = true;
    els.summonModal.hidden = true;
    carregarOnda();
  }

  // 3. Contrato com o portal: tema claro/escuro e tela cheia
  function aplicarTema(tema) {
    if (tema === "dark" || tema === "light") {
      document.documentElement.dataset.theme = tema;
    }
  }

  function temaPreferido() {
    try {
      var daUrl = new URLSearchParams(window.location.search).get("theme");
      if (daUrl === "dark" || daUrl === "light") return daUrl;
    } catch (erro) {}

    try {
      var salvo = window.localStorage.getItem("theme");
      if (salvo === "dark" || salvo === "light") return salvo;
    } catch (erro) {}

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var ultimaAltura = 0;
  function reportarAltura() {
    var altura = Math.ceil(document.body.getBoundingClientRect().height);
    if (Math.abs(altura - ultimaAltura) < 4) return;
    ultimaAltura = altura;
    window.parent.postMessage({ type: "vrgame:resize", height: altura }, "*");
  }

  window.addEventListener("message", function (event) {
    if (!event.data) return;
    if (event.data.type === "vrgame:theme") {
      aplicarTema(event.data.theme);
    }
    if (event.data.type === "vrgame:fullscreen") {
      document.documentElement.classList.toggle("is-fullscreen", Boolean(event.data.fullscreen));
    }
  });

  // Eventos dos botões
  els.btnSummon.addEventListener("click", executarSorteio);
  els.btnNextWave.addEventListener("click", function () {
    els.summonModal.hidden = true;
    estado.ondaAtual += 1;
    carregarOnda();
  });
  els.restart.addEventListener("click", reiniciarJogo);
  els.playAgain.addEventListener("click", reiniciarJogo);

  aplicarTema(temaPreferido());
  window.addEventListener("resize", reportarAltura);
  if ("ResizeObserver" in window) {
    new ResizeObserver(reportarAltura).observe(document.body);
  }

  // Inicia a primeira onda
  carregarOnda();
})();