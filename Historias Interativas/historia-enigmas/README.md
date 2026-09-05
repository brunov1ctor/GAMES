# O Colar da Duquesa — projeto jovem

Livro interativo web voltado para enigmas de lógica com narrativa de mistério. Stack: Vite + TypeScript + GSAP + Three.js. Aqui, diferente do projeto infantil, o Three.js entra pontualmente para dar atmosfera às cenas de investigação.

## Estrutura

```
src/
  main.ts             bootstrap: cria o SceneManager e abre a cena inicial
  sceneManager.ts      troca cenas dentro de #app com fade via GSAP (igual ao projeto infantil)
  types.ts             interface Scene (mount/unmount)
  scenes/
    introScene.ts       cena 3D de abertura do caso + botão "Investigar"
    puzzleScene.ts       enigma de dedução (HTML): 3 pistas, 3 suspeitos, 1 culpado
  three/
    parallaxRoom.ts      "sala noir" em camadas — a técnica de parallax 2.5D
  style/main.css
```

## A técnica de parallax (parallaxRoom.ts)

Em vez de modelar uma cena 3D real, cada camada da sala (céu, prédios, mesa, moldura da janela) é desenhada em um `<canvas>` 2D e vira uma textura aplicada a um plano do Three.js, posicionado em uma profundidade (Z) diferente. Ao mover o mouse, cada camada se desloca numa velocidade proporcional à sua profundidade — as camadas mais próximas da câmera se movem mais, as mais distantes quase não se movem. É a mesma ideia de uma imagem + mapa de profundidade, só que "fatiada" em planos em vez de um shader de deslocamento — mais simples de produzir e de trocar por arte real depois.

Para trocar pela arte final: substitua as funções `draw()` de cada layer em `LAYERS` por `ctx.drawImage(minhaImagem, 0, 0, w, h)` usando ilustrações reais recortadas por profundidade (fundo, meio, frente).

## O enigma (puzzleScene.ts)

Dedução simples por eliminação: 3 pistas textuais, 3 suspeitos, cada um com uma descrição que bate ou não com as pistas. Errar mostra o motivo da rejeição (ensina o jogador a re-ler as pistas); acertar avança a história. O conteúdo de pistas/suspeitos fica isolado no topo do arquivo — dá pra trocar o caso inteiro sem tocar na lógica.

## Rodando

```
npm install
npm run dev
```

## Próximos passos sugeridos

- Trocar as camadas placeholder por ilustrações reais.
- Extrair o puzzle de dedução para um formato de dados reutilizável (JSON por capítulo), já que a lógica de "pistas x suspeitos" se repete em qualquer mistério.
- ScrollTrigger do GSAP para narrativa em scroll (ex: ler o dossiê do caso rolando a página antes de acusar).
- Object examinável em 3D (ex: girar o colar/uma pista) para os capítulos que pedem mais que parallax.
