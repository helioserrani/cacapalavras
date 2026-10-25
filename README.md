# Caça-Palavras

Jogo de caça-palavras para o navegador (celular e computador), com vários temas e três níveis de dificuldade.

## Como jogar

1. Escolha a dificuldade (Fácil, Médio ou Difícil).
2. Toque em um tema.
3. Arraste o dedo (ou o mouse) sobre as letras de uma palavra. Também dá para tocar na primeira e depois na última letra.

| Nível   | Grade   | Palavras | Direções                          |
|---------|---------|----------|-----------------------------------|
| Fácil   | 8 × 8   | 6        | → e ↓                             |
| Médio   | 10 × 10 | 8        | → ↓ e diagonais                   |
| Difícil | 12 × 12 | 10       | todas, inclusive de trás pra frente |

## Arquivos

- `index.html`: a página do jogo
- `estilo.css`: cores e aparência
- `jogo.js`: as regras do jogo
- `temas.js`: **os temas e as palavras** (é aqui que você mexe para criar um tema novo)

## Como criar um tema novo

Abra `temas.js`, copie um bloco `{ ... }` inteiro, cole no final da lista e troque o nome, o emoji, a cor e as palavras. Pode escrever com acento.

## Como colocar dentro de outro site

O jogo não depende de nada externo. Duas formas:

- **Quadro embutido (iframe):** publique o jogo (por exemplo no GitHub Pages) e cole na página do site:
  ```html
  <iframe src="ENDERECO-DO-JOGO" style="width:100%;height:900px;border:0" title="Caça-Palavras"></iframe>
  ```
- **Página própria:** envie os 4 arquivos para uma pasta do site (ex.: `/caca-palavras/`).
