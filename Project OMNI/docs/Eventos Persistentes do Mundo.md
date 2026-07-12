# Eventos Persistentes do Mundo

## Intenção

Ações (ou omissões) dos jogadores alteram permanentemente o estado de regiões do mapa, desbloqueando novas criaturas, recursos, missões e histórias.

---

## Funcionamento

Cada região possui um **Estado Mundial** que muda com base nas decisões dos jogadores.

### Exemplo: Floresta Verde → Incêndio → Decisão

| Caminho | Resultado | Spawns |
|---------|-----------|--------|
| A - Jogadores salvam | Floresta saudável, NPCs prosperam, novas quests | Cervos, espíritos da floresta, druidas, fadas, golems vegetais |
| B - Jogadores ignoram | Floresta Negra, plantas corrompidas, nova sequência de quests | Mortos-vivos, fungos gigantes, árvores amaldiçoadas |

---

## Estados Possíveis

| Estado | Descrição |
|--------|-----------|
| Saudável | Padrão, bioma normal |
| Seca | Recursos reduzidos |
| Queimada | Destruição, cinzas |
| Corrompida | Energia da Ruptura |
| Purificada | Restaurada pelos jogadores |
| Congelada | Gelo, frio extremo |
| Inundada | Água domina |
| Cristalizada | Cristais Omni |
| Tecnológica | Máquinas ativas |
| Abissal | Escuridão, perigo máximo |

---

## O que Cada Estado Altera

- Mobs
- Recursos
- Clima
- Música
- Iluminação
- NPCs
- Missões
