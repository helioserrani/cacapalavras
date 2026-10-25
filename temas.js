// =============================================================
//  TEMAS DO CAÇA-PALAVRAS
//  Para criar um tema novo, copie um bloco { ... } abaixo,
//  troque o nome, o emoji, a cor e a lista de palavras.
//  Pode escrever as palavras com acento: o jogo cuida disso.
//  Dica: use palavras de até 10 letras. Quanto mais palavras
//  na lista, mais o jogo varia a cada partida.
// =============================================================

const TEMAS = [
  {
    id: "princesas",
    nome: "Princesas",
    emoji: "👑",
    publico: "Crianças",
    cor: "#ec4899",
    palavras: [
      "Princesa", "Castelo", "Coroa", "Vestido", "Fada", "Príncipe",
      "Varinha", "Sapatinho", "Carruagem", "Espelho", "Baile", "Unicórnio",
      "Magia", "Tiara", "Joia", "Dragão", "Reino", "Torre", "Laço", "Rainha",
      "Rei", "Trono", "Cetro", "Bruxa", "Feitiço", "Sereia", "Cavalo",
      "Jardim", "Flor", "Estrela", "Brilho", "Encanto", "Ponte", "Lago",
      "Floresta", "Pérola", "Diamante", "Rosa", "Borboleta", "Sonho",
      "Festa", "Valsa", "Conto", "Dama", "Cisne", "Abóbora", "Duende", "Arco-íris"
    ]
  },
  {
    id: "herois",
    nome: "Heróis",
    emoji: "🦸",
    publico: "Crianças",
    cor: "#2563eb",
    palavras: [
      "Herói", "Capa", "Máscara", "Poder", "Escudo", "Voar", "Força",
      "Coragem", "Amigo", "Salvar", "Raio", "Laser", "Robô", "Cidade",
      "Missão", "Vilão", "Equipe", "Foguete", "Uniforme", "Resgate",
      "Batalha", "Vitória", "Energia", "Trovão", "Gelo", "Fogo", "Vento",
      "Planeta", "Galáxia", "Nave", "Esconderijo", "Aliado", "Proteger",
      "Ajuda", "Bravura", "Sinal", "Alerta", "Cinto", "Luvas", "Botas",
      "Agilidade", "Velocidade", "Super", "Justiça", "Aventura", "Ímã", "Cometa"
    ]
  },
  {
    id: "animais",
    nome: "Animais",
    emoji: "🐶",
    publico: "Crianças",
    cor: "#f59e0b",
    palavras: [
      "Cachorro", "Gato", "Coelho", "Leão", "Tigre", "Macaco", "Girafa",
      "Elefante", "Zebra", "Urso", "Panda", "Raposa", "Lobo", "Coruja",
      "Papagaio", "Arara", "Tucano", "Pato", "Galinha", "Pintinho", "Vaca",
      "Cavalo", "Porco", "Ovelha", "Cabra", "Burro", "Sapo", "Tartaruga",
      "Jacaré", "Cobra", "Hipopótamo", "Canguru", "Coala", "Esquilo",
      "Hamster", "Rato", "Borboleta", "Abelha", "Joaninha", "Formiga",
      "Pinguim", "Camelo", "Onça", "Capivara", "Preguiça", "Tamanduá",
      "Peixe", "Lagarta", "Pônei", "Gatinho", "Filhote"
    ]
  },
  {
    id: "fundo-do-mar",
    nome: "Fundo do Mar",
    emoji: "🐠",
    publico: "Crianças",
    cor: "#0891b2",
    palavras: [
      "Peixe", "Baleia", "Golfinho", "Tubarão", "Polvo", "Lula", "Sereia",
      "Concha", "Estrela", "Moreia", "Água-viva", "Caranguejo",
      "Siri", "Lagosta", "Camarão", "Tartaruga", "Foca", "Morsa", "Pinguim",
      "Coral", "Alga", "Areia", "Onda", "Oceano", "Mar", "Praia", "Ilha",
      "Pérola", "Ostra", "Tesouro", "Navio", "Âncora", "Barco", "Farol",
      "Submarino", "Mergulho", "Bolhas", "Nadadeira", "Escama", "Recife",
      "Maré", "Gaivota", "Pirata", "Arraia", "Peixe-palhaço", "Mergulhador",
      "Snorkel", "Rede", "Azul", "Espuma", "Baiacu"
    ]
  },
  {
    id: "culinaria",
    nome: "Culinária",
    emoji: "🍲",
    publico: "Adultos",
    cor: "#ea580c",
    palavras: [
      "Receita", "Panela", "Forno", "Tempero", "Alho", "Cebola", "Bolo",
      "Feijoada", "Arroz", "Massa", "Colher", "Canela", "Manjericão",
      "Pudim", "Brigadeiro", "Farofa", "Lasanha", "Azeite", "Orégano", "Café",
      "Feijão", "Frango", "Salada", "Tomate", "Batata", "Cenoura", "Mandioca",
      "Cuscuz", "Tapioca", "Coxinha", "Pastel", "Torta", "Quindim", "Cocada",
      "Paçoca", "Canjica", "Pamonha", "Moqueca", "Strogonoff", "Sopa",
      "Assado", "Fermento", "Farinha", "Açúcar", "Manteiga", "Leite",
      "Ovos", "Batedeira", "Avental", "Travessa", "Cheiro-verde", "Louro", "Cominho"
    ]
  },
  {
    id: "autocuidado",
    nome: "Autocuidado",
    emoji: "🌸",
    publico: "Adultos",
    cor: "#a855f7",
    palavras: [
      "Ioga", "Banho", "Creme", "Sono", "Chá", "Meditar", "Caminhada",
      "Massagem", "Leitura", "Sorriso", "Paz", "Hidratar", "Alongar",
      "Descanso", "Perfume", "Música", "Terapia", "Gratidão", "Água", "Spa",
      "Respirar", "Silêncio", "Pilates", "Dança", "Natureza", "Sol", "Praia",
      "Esmalte", "Unhas", "Cabelo", "Máscara", "Pele", "Sabonete", "Vela",
      "Aroma", "Oração", "Fé", "Amizade", "Equilíbrio", "Calma", "Alegria",
      "Bem-estar", "Saúde", "Frutas", "Diário", "Passeio", "Viagem", "Cochilo", "Abraço"
    ]
  },
  {
    id: "novelas",
    nome: "Novelas e Família",
    emoji: "📺",
    publico: "Adultos",
    cor: "#dc2626",
    palavras: [
      "Novela", "Capítulo", "Galã", "Mocinha", "Vilã", "Romance",
      "Casamento", "Segredo", "Herança", "Avó", "Netos", "Família",
      "Domingo", "Almoço", "Abraço", "Saudade", "Beijo", "Final", "Ciúme", "Amor",
      "Mistério", "Traição", "Paixão", "Noivado", "Vingança", "Fazenda",
      "Mansão", "Gêmeos", "Destino", "Reencontro", "Lágrimas", "Elenco",
      "Cena", "Trama", "Sogra", "Cunhada", "Primos", "Tios", "Afilhado",
      "Madrinha", "Padrinho", "Irmãos", "Filhos", "Mãe", "Pai", "Lar",
      "Reunião", "Aniversário", "Bolo", "Fotos", "Memória", "Carinho", "União"
    ]
  },
  {
    id: "jardim",
    nome: "Jardim e Plantas",
    emoji: "🌻",
    publico: "Adultos",
    cor: "#16a34a",
    palavras: [
      "Orquídea", "Rosa", "Suculenta", "Vaso", "Regador", "Semente",
      "Terra", "Flor", "Girassol", "Lavanda", "Horta", "Folha", "Muda",
      "Adubo", "Cacto", "Samambaia", "Margarida", "Jardim", "Raiz", "Broto",
      "Violeta", "Tulipa", "Lírio", "Hortênsia", "Begônia", "Azaleia",
      "Jasmim", "Hibisco", "Bromélia", "Alecrim", "Hortelã", "Manjericão",
      "Salsinha", "Cebolinha", "Babosa", "Árvore", "Galho", "Pétala",
      "Pólen", "Abelha", "Joaninha", "Minhoca", "Tesoura", "Pá", "Mangueira",
      "Grama", "Canteiro", "Estufa", "Colheita", "Primavera", "Chuva", "Orvalho"
    ]
  }
];
