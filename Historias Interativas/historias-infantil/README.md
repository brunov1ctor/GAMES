# Histórias Mágicas — projeto infantil

Livro interativo web voltado para alfabetização e matemática básica. Stack: Vite + TypeScript + GSAP + Three.js — um mundo 3D em voxel (estilo Minecraft) navegado por scroll, com os jogos educativos aparecendo como painéis HTML por cima do 3D.

## Estrutura

```
src/
  main.ts                bootstrap: renderer, câmera-sobre-a-curva, ScrollSmoother/ScrollTrigger, companheiro, raycasting do portal
  three/
    textures.ts           texturas pixeladas geradas por canvas (grama, terra, madeira, folhas, pedra) — sem assets de imagem
    blocks.ts              construtores de objetos: createBlockField (genérico), createIsland, createTree, createHouse, createPortal, createCompanion
    pathCurve.ts             a curva única (CatmullRomCurve3) que o terreno e a câmera seguem — ver seção abaixo
    world.ts                monta a cena: terreno contínuo ao longo da curva + luzes + fog + capítulos posicionados nela
  games/
    dragDrop.ts             drag via Pointer Events + snap/feedback com GSAP (inalterado)
    wordGamePanel.ts         jogo de arrastar letras, montável como painel HTML (não é uma "cena" de tela cheia)
  style/main.css
index.html                 as seções de scroll (um <section> por capítulo) + o host do canvas fixo + smooth-wrapper do ScrollSmoother
```

## Como funciona o scroll 3D

- O canvas do Three.js fica `position: fixed` cobrindo a tela inteira, atrás de todo o conteúdo HTML (que fica dentro do `#smooth-wrapper`/`#smooth-content` do ScrollSmoother).
- `index.html` tem uma `<section class="chapter">` por capítulo, cada uma alta (`150vh`) só pra gerar distância de scroll — o conteúdo real é o mundo 3D atrás.
- **A câmera voa ao longo de uma curva única** (`three/pathCurve.ts`, um `THREE.CatmullRomCurve3`) em vez de pular entre pontos fixos por capítulo — `main.ts` pega o progresso do scroll (0 a 1) e chama `pathFrameAt(progress)` a cada frame pra saber onde a câmera deve estar e pra onde olhar. Isso elimina os cortes bruscos entre capítulos: a jornada é uma coisa só, sinuosa (a curva varia em X e desce em Y conforme o "scroll desce a página").
- O terreno (`world.ts`) também segue essa curva: `buildPathColumns()` caminha a curva em centenas de amostras, arredonda cada uma pra célula de grade mais próxima e monta uma faixa contínua de blocos (não mais 3 ilhas soltas) via `createBlockField`.
- Árvore, casa e portal são posicionados relativos a um ponto da curva (`CHAPTER_U` em `pathCurve.ts` — valores ajustados por olho, não calculados; mexa neles se um objeto sair da trilha depois de editar a curva ou a altura das seções no HTML).
- As seções têm `pointer-events: none`, então cliques do mouse atravessam o HTML e chegam no canvas — é assim que o clique no portal funciona (raycasting em `main.ts`). Elementos realmente interativos (as peças do jogo) reativam `pointer-events: auto` neles mesmos.
- O painel do jogo de palavras (`.game-panel`) fica com opacidade 0 até o `ScrollTrigger` do capítulo da floresta detectar que ele entrou em foco — só monta o jogo (`mountWordGame`) na primeira vez, pra não recriar tiles a cada scroll.
- O texto narrativo de cada capítulo (`.chapter__story`) é dividido em palavras com `SplitText` e revelado com stagger quando a seção entra em foco.
- Um companheiro voxel (passarinho, `createCompanion()`) flutua com um offset relativo à câmera, vira pra acompanhar a direção do olhar e bate as asas — puro lerp + seno, sem IA.

## Trocando os blocos placeholder por arte real

Hoje os "blocos" são caixas com texturas geradas por código (`three/textures.ts`). Pra trocar por arte de verdade, o caminho mais simples é carregar modelos `.glb` com `GLTFLoader` no lugar das funções em `three/blocks.ts` — a estrutura de "um objeto por função, adicionado em `world.ts`" continua igual.

## Rodando

```
npm install
npm run dev
```

## Skills de IA usadas neste projeto (não fazem parte do repositório)

Este projeto foi construído com a ajuda de duas skills do Claude Code instaladas em `~/.claude/skills/` — uma pasta da conta do Windows, **fora** deste repositório. Numa máquina nova, `git clone` traz o código mas não essas skills; rode de novo:

```bash
git clone https://github.com/img2threejs/img2threejs.git ~/.claude/skills/img2threejs

git clone --depth 1 https://github.com/greensock/gsap-skills.git /tmp/gsap-skills-src
for d in gsap-core gsap-frameworks gsap-performance gsap-plugins gsap-react gsap-scrolltrigger gsap-timeline gsap-utils; do
  cp -r /tmp/gsap-skills-src/skills/"$d" ~/.claude/skills/"$d"
done
rm -rf /tmp/gsap-skills-src
```

Reinicie o Claude Code depois de instalar pra elas aparecerem na lista de skills.

## Próximos passos sugeridos

- Novos ambientes entre/depois dos 3 capítulos atuais (ex: uma caverna, um deserto) — basta estender `PATH_POINTS` em `pathCurve.ts`, adicionar uma entrada em `CHAPTER_U` e posicionar o novo cenário com `pathFrameAt()`, do mesmo jeito que floresta/vila/portal.
- Jogo de matemática básica no Capítulo 2 (Vila dos Números), reaproveitando `dragDrop.ts` do mesmo jeito que `wordGamePanel.ts` faz.
- Mais palavras/fases no Capítulo 1 (hoje é só "GATO", fixo).
- Áudio: narração e efeitos sonoros (`src/assets/audio`), sincronizados com os `ScrollTrigger` de cada capítulo.
- Sway sutil nas árvores/folhas (rotação leve por seno no loop de `animate()`).
