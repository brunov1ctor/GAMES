# LO-FI COZY KITCHEN — Game Design Document

## CONCEITO

Jogo indie para PC de gerenciamento de restaurante/cozinha cozy, relaxante e altamente atmosférico.
Ambientado em um bairro urbano japonês/cyber-noir chuvoso — pequenas ruas iluminadas por neon, becos apertados, cabos elétricos, chuva constante, fumaça saindo das cozinhas e música lo-fi noturna.

### Sensação Visual
- Conforto melancólico
- Noites chuvosas
- Solidão aconchegante
- Bairro decadente mas vivo
- Evolução lenta e emocional

### Direção Artística
Estilo **low poly / stylized lo-fi**, altamente atmosférico, com:
- Iluminação cinematográfica
- Chuva procedural
- Neblina volumétrica leve
- Reflexos molhados
- Interiores extremamente aconchegantes

### Fantasia Principal
> "Transformar uma pequena cozinha esquecida em um restaurante lendário do bairro."

### Anti-Padrão
O jogo **NÃO** segue o loop clássico de "coletar recurso → esperar X minutos → entregar ao NPC".

### Pilares de Design
- Ritual
- Relaxamento
- Progressão orgânica
- Habilidade culinária
- Administração inteligente
- Construção de reputação
- Descoberta
- Socialização leve

---

## PROGRESSÃO — TIERS DO RESTAURANTE

### Tier 1 — Cubículo
Cozinha extremamente pequena em uma esquina decadente do bairro.
- Fogão velho
- Bancada pequena
- Geladeira limitada
- Poucos utensílios
- Iluminação simples
- Poucas cadeiras
- Visual humilde, apertado, quase improvisado

### Tier 2 — Cozinha de Bairro
- Expansão do espaço
- Novos móveis
- Freezer usado
- Decoração improvisada

### Tier 3 — Restaurante Local
- Mais clientes
- Equipe pequena
- Cozinha parcialmente automatizada

### Tier 4 — Restaurante Cult Underground
- Fila na chuva
- Críticos gastronômicos
- Pratos lendários
- Reputação alta

### Tier 5 — Restaurante Icônico do Bairro
- Visual cinematográfico
- Mantém sensação íntima e cozy
- Nunca vira uma corporação fria

A progressão deve ser altamente visual e satisfatória. O restaurante evolui fisicamente conforme o jogador cresce.

---

## LOOP PRINCIPAL

O loop ocorre em **ciclos diários**.

### 1. Exploração do Bairro

O jogador sai da cozinha e explora o bairro. O bairro funciona como um ecossistema vivo e procedural.

Ingredientes aparecem dinamicamente dependendo de:
- Horário
- Clima
- Estação
- Eventos do bairro
- Reputação do jogador
- Fornecedores desbloqueados

#### Exemplos por Horário/Condição

**Manhã:**
- Vegetais frescos
- Leite
- Pão
- Ovos

**Noite:**
- Peixe fresco
- Cogumelos
- Ingredientes premium

**Dias chuvosos:**
- Ingredientes para ensopados
- Frutos do mar
- Cogumelos raros

**Festivais:**
- Ingredientes exclusivos

O sistema deve lembrar Pokémon GO adaptado para PC (sem GPS real). O jogador explora a cidade para encontrar ingredientes raros, promoções, fornecedores e eventos culinários.

---

## SISTEMA DE INGREDIENTES FRESCOS

Cada ingrediente possui:

### Qualidade
- Comum
- Bom
- Premium
- Excepcional

### Estado de Frescor (dinâmico)

| Frescor | Estado |
|---------|--------|
| 100% | Recém colhido |
| 75% | Fresco |
| 50% | Envelhecendo |
| 25% | Perto de estragar |
| 0% | Estragado |

### 🥬 Janela Ideal de Uso

Cada ingrediente possui uma **janela ideal** — o momento perfeito para ser usado.

Nem sempre 100% é o melhor. Alguns ingredientes precisam "descansar":
- Carne: melhor entre 90%-75% (maturação leve)
- Peixe: melhor em 100%-90% (ultra fresco)
- Queijo: melhor entre 80%-60% (sabor desenvolvido)
- Frutas para doce: melhor entre 85%-70% (mais doces)

Usar o ingrediente na janela ideal concede bônus:
- +Sabor
- +Avaliação
- Tag "Timing Perfeito"

O armazenamento afeta a velocidade de decaimento:
- Bancada: decai rápido
- Geladeira: decai devagar
- Freezer: congela frescor (mas perde textura)

O jogador deve aprender quando cada ingrediente está no ponto ideal — não apenas "usar antes de estragar".

### Impacto do Frescor
- Sabor
- Avaliação do prato
- Aparência
- Valor de venda
- Reputação

Ingredientes premium frescos geram pratos mais memoráveis. Clientes comentam a diferença:
- *"Esse peixe estava absurdamente fresco."*
- *"Os vegetais pareciam um pouco velhos hoje."*

O jogador deve administrar estoque e desperdício.

---

## GESTÃO DA COZINHA

Sistema de gerenciamento real. O jogador gerencia:
- Estoque
- Refrigeração
- Espaço físico
- Layout
- Eficiência
- Funcionários

### Importância do Layout

**Layouts ruins:**
- Funcionários colidem
- Pedidos atrasam
- Ingredientes estragam

**Layouts eficientes:**
- Fluxo de cozinha otimizado
- Maior produtividade

### Equipamentos Desbloqueáveis
- Fogões
- Fornos
- Geladeiras
- Freezers
- Bancadas
- Fatiadores
- Fritadeiras
- Equipamentos especiais

A automação existe mas vem com trade-offs.

---

## 🔥 SISTEMA DE ATENÇÃO PARCIAL

Mecânica **MUITO FORTE** e central ao gameplay.

O jogador gerencia múltiplas tarefas simultâneas na cozinha, mas com atenção limitada. Não é multitasking frenético — é sobre priorizar e manter consciência do que está acontecendo.

Exemplos:
- Enquanto frita um peixe, o arroz está cozinhando — precisa ficar de olho no ponto
- Um cliente pede um acompanhamento enquanto o prato principal está no fogo
- O óleo esquenta demais se ignorado por tempo demais
- Ingrediente na bancada perde frescor se não usado a tempo

O sistema recompensa:
- Atenção dividida inteligente
- Timing preciso
- Leitura do estado da cozinha

Punições por desatenção:
- Prato queimado
- Ingrediente desperdiçado
- Cliente esperando demais
- Perda de qualidade

A sensação deve ser como um chef real: calmo mas atento, não caótico.

---

## 🧂 SISTEMA DE "MOMENTO CHEF"

O personagem evolui seu conhecimento culinário **através de descobertas no mundo**.

Para aprender novas técnicas, receitas e combinações, o jogador precisa:
- **Ler** livros, revistas, receitas encontradas no bairro
- **Encontrar itens** relacionados ao seu tipo de culinária (utensílios especiais, temperos raros, cadernos de receita)
- **Conversar** com NPCs que compartilham dicas
- **Observar** outros cozinheiros no bairro

### Como Funciona
Conforme o jogador encontra e consome esses itens de conhecimento:
- Novas **interações** aparecem durante o cozimento (ex: "temperado com técnica especial")
- Novos **ingredientes** podem ser adicionados aos pratos principais
- Combinações antes invisíveis se tornam disponíveis
- O personagem ganha "inspiração" para experimentar

### Exemplo
O jogador encontra um livro sobre fermentação coreana → desbloqueia a possibilidade de usar kimchi como acompanhamento → novas interações surgem ao preparar pratos com base de arroz.

Isso conecta diretamente com o build do chef: um Chef de Rua encontra itens diferentes de um Chef Artesanal.

---

## 🎵 FLOW STATE / ZONA DO CHEF

Quando o jogador acerta múltiplas ações em sequência sem errar (timing do corte, virou o peixe na hora, temperou no ponto), ele entra num estado de "flow".

### Ativação
- Acertar 3+ ações consecutivas com bom timing
- Manter atenção parcial sem queimar/desperdiçar nada
- Transições suaves entre tarefas paralelas

### Efeitos do Flow State
- Música lo-fi fica mais intensa/envolvente
- Leve efeito visual de foco (vinheta suave, cores mais vivas)
- Ações ficam levemente mais responsivas
- Bônus sutil de qualidade nos pratos
- Maior chance de "Momento Chef" aparecer

### Perda de Flow
- Gradual, nunca punitiva
- Errar uma ação reduz o nível do flow
- Não é game over — é só o bônus sumindo suavemente
- O jogador quer manter o flow, então cada segundo entre ações importa

Isso transforma o tempo de preparo em **ritmo**. O jogador não espera — ele flui.

---

## 🍳 GESTÃO PARALELA DA COZINHA (ESSENCIAL)

O jogador **nunca** gerencia apenas um prato por vez. A cozinha funciona em paralelo.

Múltiplos processos acontecem simultaneamente:
- Prato A no fogo (precisa virar em 30s)
- Prato B sendo cortado (minigame ativo)
- Arroz cozinhando (timer passivo)
- Cliente pedindo acompanhamento

O jogador decide:
- O que fazer manualmente (maior qualidade)
- O que deixar no automático (menor qualidade mas libera atenção)
- Quando pausar uma tarefa para atender outra

Isso se conecta diretamente com:
- Sistema de Atenção Parcial (priorização)
- Sistema Artesanal vs Industrial (trade-off de qualidade)
- Layout da cozinha (posição dos equipamentos afeta eficiência da gestão paralela)

---

## SISTEMA ARTESANAL VS INDUSTRIAL

Mecânica central. Todo prato pode ser preparado de duas maneiras:

### Industrial
- Uso de máquinas
- Mais rápido
- Mais consistente
- **Menor valor emocional**

### Artesanal
- Feito manualmente
- Mais lento
- Mais difícil
- **Mais valioso**
- **Maior reputação**

#### Exemplo: Ratatouille

Etapas: cortar legumes → temperar → refogar → empratar

Se o jogador cortar os legumes manualmente (sem fatiador automático), recebe a tag **ARTESANAL**.

Isso aumenta:
- Valor do prato
- Prestígio
- XP culinário
- Chance de cliente lembrar do prato

---

## SISTEMA DE HABILIDADES

Cada técnica culinária sobe separadamente:
- Fatiar
- Frituras
- Assados
- Doceria
- Picantes
- Espetos
- Fermentação
- Caldo
- Emplatamento

### Progressão de Habilidade
Quanto maior a habilidade:
- Melhor qualidade do prato
- Mais consistência
- Desbloqueio de receitas avançadas
- Novas técnicas

### Builds de Chef

| Build | Especialidade |
|-------|--------------|
| Chef Artesanal | Forte em pratos feitos manualmente |
| Chef Industrial | Forte em produção em massa |
| Chef de Rua | Especialista em espetos e frituras |
| Chef Noturno | Buffs em pratos servidos à noite |

---

## MINIGAMES COZY DE COZINHA

Os minigames devem ser **relaxantes e satisfatórios**. Nunca frenéticos.

| Minigame | Ação |
|----------|------|
| Fatiar | Cortes suaves e precisos |
| Fritura | Controlar temperatura do óleo |
| Assados | Monitorar ponto ideal |
| Temperar | Equilibrar sabores |
| Emplatamento | Montagem estética do prato |

A sensação deve ser **meditativa**.

---

## 🎨 PLATE ART (Pratos Chiques)

Sistema de emplatamento artístico para pratos de alta qualidade.

Disponível quando:
- Habilidade de Emplatamento atinge nível intermediário+
- Prato é de qualidade Premium ou superior
- Ingredientes estão na janela ideal

### Como Funciona
Após cozinhar, o jogador entra em um **modo de montagem visual** do prato:
- Posicionar elementos no prato
- Escolher tipo de prato/tigela
- Adicionar detalhes (molho decorativo, microgreens, gotas, fumaça)
- Arranjo estético importa

### Impacto
- Pratos com Plate Art vendem por mais
- Clientes tiram "foto" (viraliza no bairro → mais reputação)
- Críticos gastronômicos avaliam apresentação separadamente
- Desbloqueia tag "Obra de Arte Culinária"
- No Tier 4+ se torna quase obrigatório para manter reputação

### Conexão com Outros Sistemas
- Chef Artesanal ganha bônus em Plate Art
- Pratos artesanais + Plate Art = combo máximo de prestígio
- Momento Chef pode desbloquear novas técnicas de apresentação

---

## SISTEMA SOCIAL

Jogadores podem:
- Adicionar amigos
- Visitar cozinhas
- Trocar ingredientes
- Enviar refeições
- Contratar chefs temporários
- Fazer encomendas

---

## ALIANÇAS GASTRONÔMICAS

Guilds cozy. Exemplo: *"Midnight Kitchens Collective"*

Missões:
- Cozinhar juntos
- Festivais
- Contratos culinários
- Desbloquear fornecedores especiais

---

## SABOTAGEM LEVE E DIVERTIDA

Nunca tóxica. Tom sempre divertido.

Exemplos:
- Rival comprou ingredientes antes de você
- Fake review temporária
- Atrasar entrega
- Esconder fornecedor secreto

---

## 👥 CLIENTES VIVOS

Clientes possuem:
- Personalidade
- Preferências
- Memória

### Exemplos de Clientes
- Salaryman cansado
- Estudante de arte
- Crítico gastronômico
- Velhinha do bairro

### Progressão da Interação com Clientes por Tier

**Tier 1–2 (Cubículo / Cozinha de Bairro):**
O restaurante é uma cozinha de esquina. Não há mesas nem cadeiras para sentar.
- Cliente pede no balcão, come em pé ou leva embora
- Interação é rápida e objetiva
- Cliente pode pedir **acompanhamentos simples** enquanto come o prato principal (molhos, saladas, picles)
- Isso gera micro-pedidos paralelos que alimentam a Gestão Paralela

**Tier 3+ (Restaurante Local em diante):**
O restaurante ganha mesas e cadeiras.
- Sistema de **Conversa Viva** é desbloqueado
- Clientes sentam, conversam entre si, interagem com o chef
- Pedidos se tornam mais complexos (entrada + principal + sobremesa)
- Relacionamentos profundos se desenvolvem

### Memória de Clientes
Cliente lembra pratos anteriores:
- *"Quero aquele curry de semana passada."*

Relacionamentos desbloqueiam:
- Histórias
- Receitas
- Segredos

---

## EVOLUÇÃO DO BAIRRO

O bairro evolui junto do jogador.

**Início:** bairro decadente.

**Depois:**
- Mais lojas
- Mais movimento
- Mercados noturnos
- Neon
- Música de rua

O jogador deve sentir: *"Eu ajudei esse bairro a florescer."*

---

## 🐾 SISTEMA DE PETS

Após completar certas missões, o jogador pode encontrar e adotar pets no bairro. Cada pet tem presença na cozinha com utilidade mecânica real — nunca são apenas enfeite.

### Base Universal (todos os pets)
- **Carisma** → influencia positivamente a nota de avaliação dos clientes + atrai mais clientes ao restaurante
- Presença visual cozy na cozinha (animações idle, sons ambientes sutis)

### Categorias de Habilidade

Cada pet pertence a **1 categoria**. Dentro da mesma categoria, pets diferentes têm variações de potência ou sabor.

| Categoria | Efeito | Exemplos |
|-----------|--------|----------|
| **Sentinela** | Alerta visual/sonoro sobre estado da cozinha (ingrediente na janela ideal, prato queimando, timing) | Gato, Coruja, Camaleão |
| **Farejador** | Encontra ingredientes raros, fornecedores ocultos ou eventos no bairro durante exploração | Cachorro, Porco, Furão |
| **Conservador** | Reduz passivamente a velocidade de decaimento de frescor dos ingredientes próximos | Tartaruga, Caracol, Sapo |
| **Catalisador** | Facilita a ativação e manutenção do Flow State (zona do chef) | Hamster, Esquilo, Coelho |
| **Magnético** | Atrai tipos específicos de clientes (premium, críticos, recorrentes de alto valor) | Polvo, Baiacu, Peixe-palhaço, Panda vermelho |
| **Mensageiro** | Acelera construção de vínculo com clientes / faz clientes voltarem mais rápido | Pássaro, Pombo, Borboleta |

### Regras
- Cada pet pertence a 1 categoria fixa
- **1 pet ativo na cozinha** por turno (escolha estratégica baseada na necessidade do dia)
- Os demais ficam no **Cantinho dos Pets** — decoração viva com carisma passivo reduzido (sem habilidade ativa)
- Sistema aberto: novos pets podem ser adicionados infinitamente encaixando-os em uma categoria existente

### Progressão de Vínculo
- Pet começa como encontro contextual pós-missão (gato no beco, tartaruga na chuva, pássaro no telhado)
- Alimentar com sobras de qualidade → vínculo cresce
- Maior vínculo → habilidade ativa mais forte + visual do pet evolui (coleira, cama melhor, laço, acessórios)
- Vínculo máximo desbloqueia uma **variação cosmética rara** do pet

### Conexão com Outros Sistemas
- **Atenção Parcial:** Sentinela é mais um sinal pra ler na cozinha
- **Exploração:** Farejador expande o que o jogador encontra no bairro
- **Frescor:** Conservador interage diretamente com decaimento
- **Flow State:** Catalisador facilita entrar/manter a zona
- **Clientes Vivos:** Magnético e Mensageiro influenciam quem vem e com que frequência
- **Reputação:** Carisma base de todos os pets contribui para avaliação geral

---

## SISTEMA DE DESCOBERTA DE RECEITAS

Receitas **não** são desbloqueadas linearmente.

Misturar ingredientes e técnicas pode gerar descobertas.

Exemplo: Cogumelos + creme + vinho → receita nova.

Experimentação deve ser recompensada.

---

## ATMOSFERA

O jogo deve ser possível de deixar aberto enquanto relaxa.

### Sons Ambientes
- Chuva
- Óleo fritando
- Panela fervendo
- Rádio lo-fi
- Jazz suave
- Cidade noturna

### Sensação Emocional Desejada
> "Quero morar dentro desse jogo."

---

## 🏪 SISTEMA DE FORNECEDORES / RELAÇÕES COMERCIAIS

Fornecedores são NPCs com personalidade que abastecem a cozinha. Não são menus genéricos — são relações.

### Como Funciona
- Cada fornecedor vende uma categoria específica (peixes, vegetais, carnes, temperos exóticos, laticínios)
- Fornecedores têm **horários e dias fixos** — se o jogador não está disponível, perde a entrega
- Relacionamento cresce com compras frequentes e consistência

### Progressão de Relacionamento

| Nível | Benefício |
|-------|----------|
| Desconhecido | Preço cheio, catálogo básico |
| Conhecido | Pequeno desconto, avisa sobre promoções |
| Regular | Desconto maior, acesso a ingredientes reservados |
| Parceiro | Preços exclusivos, entregas prioritárias, ingredientes sazonais raros |
| Amigo | Presentes ocasionais, dicas de fornecedores secretos, ingredientes únicos |

### Regras
- Escolher um fornecedor pode **fechar acesso a outro rival** (ex: dois pescadores que não se falam)
- Alguns fornecedores só aparecem à noite, na chuva, ou em eventos específicos
- Fornecedores podem sumir temporariamente (viagem, estação) — forçando adaptação
- Fornecedores secretos são descobertos via exploração, dicas de clientes, ou pet Farejador

### Conexão com Outros Sistemas
- **Exploração:** encontrar novos fornecedores no bairro
- **Pets (Farejador):** revelam fornecedores ocultos
- **Reputação:** fornecedores de alto nível só vendem pra quem tem reputação mínima
- **Eventos Sazonais:** fornecedores trazem ingredientes limitados por temporada

---

## 💰 SISTEMA ECONÔMICO / FINANÇAS

Dinheiro é recurso real e limitante. O jogador precisa equilibrar investimento e sobrevivência.

### Fontes de Renda
- Venda de pratos (preço definido pelo jogador)
- Encomendas especiais (NPCs pedem pratos específicos com bônus)
- Catering para eventos do bairro
- Venda de sobras reaproveitadas

### Custos
- Ingredientes (variável por fornecedor/qualidade/estação)
- Aluguel (aumenta conforme tier sobe)
- Manutenção de equipamentos
- Salário de funcionários (Tier 3+)
- Expansões e reformas

### Precificação de Pratos
O jogador define o preço de cada prato no cardápio:
- **Preço baixo:** mais clientes, menos lucro, reputação de "acessível"
- **Preço alto:** menos clientes, mais lucro por prato, risco de afastar público
- **Preço justo:** equilíbrio — o jogo sugere faixa ideal baseada em qualidade + ingredientes

Preço interage com:
- Qualidade real do prato
- Reputação atual
- Tipo de cliente (premium aceita preço alto, trabalhador não)
- Tag artesanal/Plate Art justifica preço maior

### Dias Ruins
- Dias com poucos clientes existem (clima, eventos no bairro, concorrência)
- O jogador precisa ter reserva financeira
- Ingredientes comprados e não usados = prejuízo
- Forçar decisões: comprar ingrediente caro apostando que vende, ou jogar seguro?

### Investimento vs Lucro
- Comprar equipamento melhor = gasto agora, economia depois
- Expandir cozinha = custo alto, mais capacidade
- O jogo nunca deve punir brutalmente — mas consequência existe

---

## 📰 SISTEMA DE REPUTAÇÃO DETALHADO

Reputação é a moeda invisível do jogo. Determina quem te conhece, quem vem, e o que se abre.

### Reputação Geral
- Sobe com: pratos de qualidade, consistência, Plate Art, clientes satisfeitos
- Desce com: pratos ruins, desperdício visível, cliente ignorado, preço abusivo
- **Sobe devagar, desce rápido** (realista)

### Reputação por Especialidade
O jogador ganha fama em categorias específicas baseado no que mais cozinha:
- "Conhecido pelo ramen"
- "Melhor fritura do bairro"
- "Mestre dos doces"
- "Rei dos frutos do mar"

Isso atrai clientes que buscam aquela especialidade e influencia quais críticos aparecem.

### Reviews / Boca a Boca
- Clientes satisfeitos geram "reviews" que aparecem como posts visuais no bairro (murais, conversas de NPCs)
- Reviews negativas também aparecem — mas podem ser revertidas com consistência
- Reviews especiais de críticos gastronômicos (Tier 4+) têm peso massivo

### Milestones de Reputação

| Milestone | Desbloqueio |
|-----------|------------|
| Bairro te conhece | Clientes recorrentes aparecem |
| Fila começa a formar | Fornecedores premium te procuram |
| Crítico aparece | Chance de review que viraliza |
| Lenda local | Clientes de outros bairros vêm te visitar |
| Icônico | O restaurante vira ponto turístico do bairro |

### Conexão com Outros Sistemas
- **Pets (Magnético/Mensageiro):** influenciam tipo e frequência de clientes
- **Plate Art:** pratos bonitos geram reviews visuais
- **Precificação:** preço justo mantém reputação, preço abusivo destrói
- **Tier do restaurante:** reputação é requisito pra subir de tier
- **Fornecedores:** reputação alta desbloqueia fornecedores exclusivos

---

## 🗑️ SISTEMA DE DESPERDÍCIO / SUSTENTABILIDADE

Ingredientes estragados e sobras não são lixo — são recurso.

### Ciclo de Reaproveitamento

| Sobra/Estragado | Uso |
|-----------------|-----|
| Ingrediente estragado | Composto → trocar com NPC jardineiro por temperos frescos |
| Sobras de qualidade | Alimentar pet (sobe vínculo) |
| Sobras cozidas | Criar pratos de reaproveitamento (croquetes, caldos, sopas) |
| Óleo usado | Vender pra NPC específico / trocar por sabão artesanal (item decorativo) |

### Pratos de Reaproveitamento
- Receitas específicas que usam sobras como ingrediente principal
- Vendem por menos, mas custo é quase zero = lucro limpo
- Alguns clientes PREFEREM esses pratos (velhinha do bairro, trabalhador)
- Tag "Sustentável" no prato

### Métrica de Desperdício
- O jogo rastreia % de desperdício semanal
- Baixo desperdício = bônus de reputação ("restaurante consciente")
- Alto desperdício = leve penalidade de reputação + custo real (dinheiro jogado fora)
- NPCs comentam: *"Gosto daqui, nunca vejo comida sendo jogada fora."*

### Conexão com Outros Sistemas
- **Pets:** sobras alimentam pets, desperdiçar demais = menos recurso pra vínculo
- **Econômico:** menos desperdício = mais margem de lucro
- **Reputação:** sustentabilidade é fator de avaliação
- **Fornecedores:** NPC jardineiro troca composto por ingredientes

---

## 🎶 SISTEMA DE RÁDIO / PLAYLIST

A cozinha tem um rádio. A música é parte da atmosfera e tem impacto leve no gameplay.

### Estações Base
- Lo-fi Beats
- Jazz Noturno
- Ambient Rain
- Bossa Nova
- City Pop
- Silêncio (só sons da cozinha + chuva)

### Desbloqueio de Estações
- Encontrar discos/fitas/CDs espalhados pelo bairro durante exploração
- NPCs presenteiam músicas após vínculo alto
- Eventos sazonais trazem estações temporárias
- Fornecedores podem vender raridades musicais

### Impacto no Gameplay
- Cada estação influencia **levemente** o mood dos clientes:
  - Jazz → clientes premium ficam mais tempo, pedem mais
  - Lo-fi → facilita manutenção do Flow State
  - Bossa Nova → clientes relaxam, avaliam com mais generosidade
  - Silêncio → bônus pra Atenção Parcial (ouve melhor os sons da cozinha)
- Impacto é sutil, nunca obrigatório — escolha de vibe, não meta

### Colecionável
- Fitas e discos são itens colecionáveis com arte própria
- Coleção completa de uma estação desbloqueia variação visual do rádio
- Jogadores podem montar playlist pessoal misturando faixas de estações diferentes

### Conexão com Outros Sistemas
- **Flow State:** Lo-fi facilita entrada na zona
- **Clientes:** mood musical influencia tempo de permanência e avaliação
- **Exploração:** discos são encontráveis no bairro como recompensa
- **Atmosfera:** reforça o pilar de "quero morar nesse jogo"

---

## VERTICAL SLICE (MVP)

Criar primeiro um vertical slice extremamente pequeno:

1. Uma cozinha minúscula
2. Apenas 5 ingredientes
3. 3 pratos
4. 1 cliente recorrente
5. Sistema de frescor
6. Minigame simples de corte
7. Um ciclo dia/noite
8. Expansão visual mínima da cozinha

Somente depois adicionar:
- Social
- Alianças
- Sabotagem
- Bairro procedural
- Funcionários
- Automação avançada

### Prioridade Absoluta
> **FAZER O LOOP DE COZINHAR SER DIVERTIDO ANTES DE ESCALAR O RESTO.**

Sistema de "Personalidade dos Utensílios
Exemplo:

Panela de Ferro 
+20% para ensopados
Esquenta lentamente

Panela de Cobre
Aquece muito rápido
Excelente para molhos
Queima facilmente se ignorada

Panela de Barro
Cozimento lento
Ideal para caldos

# Assinatura do Chef
Alguma especialidade ou modo de preparo

# Inspecionar objetos

Panela de Ferro Nº 01

Comprada: Dia 3
Litros na panela:3
Desgaste: Nova
Pratos preparados: 2.487
Ensopados: 614
Ramens: 398
Horas no fogo: 173 h
Seasoning: 96%
Histórias: "Foi usada no primeiro prato cinco estrelas", "Estava presente durante a visita do primeiro crítico gastronômico".

# MULTIPLAYER
1. Mesmo restaurante

Amigos trabalham juntos no mesmo estabelecimento.
Exemplo:
jogador 1 cozinha
jogador 2 explora ingredientes
jogador 3 atende clientes
jogador 4 organiza estoque / lava utensílios / cuida dos pets
Perfeito para o loop de gestão paralela da cozinha, que já é central no GDD.

2. Restaurantes rivais no mesmo bairro
Cada jogador começa em um ponto diferente do mapa.
Eles competem por:
clientes
fornecedores
reputação
ingredientes raros
eventos gastronômicos
reviews
ranking semanal do bairro
Mas sem virar tóxico. Rivalidade leve e divertida.

3. Modo misto

Dois jogadores podem ter restaurantes separados, mas fazer parcerias temporárias.
Exemplo:
Festival da Chuva
Evento de Ramen Noturno
Catering para NPC importante
Competição de prato artesanal
Mecânicas boas para o multiplayer
Fornecedores compartilhados

Um fornecedor aparece à noite com peixe raro.
Quem chegar primeiro compra.
Ou dois jogadores podem dividir o lote.
Reputação por bairro
Cada restaurante ajuda a evoluir o bairro.
Mesmo rivais, todos contribuem para deixar a região mais viva.
Visita ao restaurante do amigo
O jogador pode visitar, comer, avaliar e até deixar gorjeta.
Sabotagem leve
Nada agressivo.
Exemplos:
comprar estoque antes do rival
espalhar boato engraçado
mandar cliente exigente para o amigo
desafiar para duelo culinário
Cozinha compartilhada

No mesmo restaurante, precisa ter comunicação:
“Cuida do arroz, eu vou fritar o peixe.”
Isso combina muito com a ideia de atenção parcial.
Progressão multiplayer
O host cria o mundo.
Depois convida amigos.
Cada amigo escolhe:
entrar como sócio do restaurante;
abrir um restaurante rival;
trabalhar temporariamente como chef convidado.
Modos
1. Mesmo restaurante

Amigos trabalham juntos no mesmo estabelecimento.

Exemplo:

jogador 1 cozinha
jogador 2 explora ingredientes
jogador 3 atende clientes
jogador 4 organiza estoque / lava utensílios / cuida dos pets

Perfeito para o loop de gestão paralela da cozinha, que já é central no GDD.

2. Restaurantes rivais no mesmo bairro

Cada jogador começa em um ponto diferente do mapa.

Eles competem por:

clientes
fornecedores
reputação
ingredientes raros
eventos gastronômicos
reviews
ranking semanal do bairro

Mas sem virar tóxico. Rivalidade leve e divertida.

3. Modo misto

Dois jogadores podem ter restaurantes separados, mas fazer parcerias temporárias.

Exemplo:

Festival da Chuva
Evento de Ramen Noturno
Catering para NPC importante
Competição de prato artesanal
Mecânicas boas para o multiplayer
Fornecedores compartilhados

Um fornecedor aparece à noite com peixe raro.
Quem chegar primeiro compra.
Ou dois jogadores podem dividir o lote.
Reputação por bairro
Cada restaurante ajuda a evoluir o bairro.
Mesmo rivais, todos contribuem para deixar a região mais viva.
Visita ao restaurante do amigo
O jogador pode visitar, comer, avaliar e até deixar gorjeta.

Sabotagem leve

Nada agressivo.

Exemplos:

comprar estoque antes do rival
espalhar boato engraçado
mandar cliente exigente para o amigo
desafiar para duelo culinário
Cozinha compartilhada

No mesmo restaurante, precisa ter comunicação:
“Cuida do arroz, eu vou fritar o peixe.”
Isso combina muito com a ideia de atenção parcial.
Progressão multiplayer
O host cria o mundo.
Depois convida amigos.

Cada amigo escolhe:
entrar como sócio do restaurante;
abrir um restaurante rival;
trabalhar temporariamente como chef convidado.


Em vez de criar punições aleatórias, eu faria um sistema onde o bairro é vivo e imprevisível, obrigando o jogador a se adaptar como um verdadeiro dono de restaurante.

Sistema de Desafios do Bairro
Os problemas acontecem naturalmente.
Não parecem eventos de videogame.
Parecem coisas da vida real.
Problemas do Imóvel
Encanamento
Pode ocorrer:
vazamento
pia entupida
baixa pressão
água quente para de funcionar

Consequências:

lavar pratos demora mais
alguns equipamentos ficam inutilizados
piso molhado aumenta risco de acidentes

Soluções:

contratar encanador
consertar sozinho (minigame)
trocar tubulação
Energia
queda de energia
fusível queimado
freezer desliga
luz piscando

O jogador pode comprar:

gerador
nobreak para equipamentos críticos
sistema elétrico novo
Gás
botijão acaba
vazamento
inspeção
Exaustão

Se não limpar:

fumaça aumenta
clientes reclamam
cozinheiros cansam mais
Imóvel

O aluguel nunca é fixo.

Depende de:

fama do bairro
inflação
interesse imobiliário
eventos

Exemplo:

Um shopping abre perto.

↓

Aluguel sobe.

Você decide:

pagar
mudar de ponto
comprar o imóvel
Movimento da Rua

Essa é uma das minhas ideias favoritas.

Cada rua possui um índice de movimento.

Exemplo:

Segunda:

⭐⭐⭐⭐☆

Quarta:

⭐⭐☆☆☆

Domingo:

⭐⭐⭐⭐⭐

Dias de chuva:

⭐⭐⭐⭐⭐ para cafés e sopas

Dias quentes:

⭐⭐⭐⭐⭐ para sorvetes e drinks

Concorrência

Um NPC abre uma pizzaria.

Você perde clientes.

Meses depois:

Ela fecha.

Ou muda de culinária.

Ou vira sua parceira.

Obras na Rua

A prefeitura fecha parte da rua.

Durante uma semana:

menos movimento
poeira
menos turistas

Depois:

Rua reformada.

Mais clientes.
Transporte
Nova estação de metrô.

↓

Fluxo aumenta.

Ou...

Uma linha de ônibus muda.
↓
Fluxo diminui.

Criminalidade

Sem exageros.

Exemplos:

pichações
pequeno furto
janela quebrada

O jogador pode:

instalar câmera
contratar segurança
melhorar iluminação
Economia

Ingredientes mudam de preço.

Exemplo:
Tempestade destruiu plantações.
↓
Tomate +80%
Você muda o cardápio.

Tendências

Uma influencer viraliza:
"Curry Picante"
Durante duas semanas:
Todo mundo quer curry.

Depois:
Moda acaba.
Clientes
Mudam conforme a estação.

Inverno:
Mais:

sopas
ramen
chocolate quente

Verão:
Mais:

sorvete
drinks
saladas
Funcionários

Eles também têm problemas.

ficam gripados
pedem férias
aprendem novas habilidades
recebem proposta de outro restaurante
brigam entre si
Pets

O gato derruba um pote.
O cachorro espanta rato.
A coruja percebe fumaça.

São pequenos acontecimentos que tornam a cozinha mais viva.

Fiscalização

O bairro recebe inspeções.
São anunciadas alguns dias antes.

O jogador decide:
limpar tudo
ignorar

Nota alta:
Reputação.
Nota baixa:
Multa.

Eventos Climáticos
tempestade
onda de calor
neve (em mapas específicos)
ventania

Tudo muda o comportamento dos clientes.

Bairro Vivo

Imagine o jogador entrando hoje.

Na semana passada:

Uma cafeteria abriu.

Hoje:

Virou livraria.

Mês seguinte:

Fechou.

No lugar:

Abriu um bar.
O bairro nunca é igual.
Grandes Decisões
Conforme o restaurante cresce, surgem oportunidades que mudam permanentemente a campanha.

Exemplos:

Comprar o prédio

Vantagens:

nunca mais paga aluguel;
pode reformar livremente.

Desvantagens:

investimento muito alto;
menos capital para expansão.
Mudar para um bairro nobre
Mais clientes.
Mais aluguel.
Mais concorrência.
Abrir uma segunda unidade
Você passa a administrar duas cozinhas.
Permanecer no bairro antigo
Clientes antigos continuam fiéis. Fulano é Cliente a tanto tempo ... voce so conhece os clientes interagindo ao longo do game vai conhecendo aos poucos as pessoas do bairro.
Você mantém a identidade local.