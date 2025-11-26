# Questionário Gamificado CRM - TODO

## Fase 1: Configuração e Dependências
- [x] Inicializar projeto web (React/TS/Vite)
- [x] Instalar Framer Motion para animações
- [x] Configurar TailwindCSS (já incluído no template)
- [x] Configurar tema Dark premium com cores azul/ciano neon

## Fase 2: Componente Avatar
- [x] Criar componente Avatar com aparência (corpo branco, cabeça com visor, olhos/boca azul)
- [x] Implementar glow circular azul neon
- [x] Criar tipo AvatarState com estados (idle, blinking, happy, clap, jump, spin, thinking)
- [x] Implementar animação idle (levitação suave)
- [x] Implementar animação blinking (piscar realista)
- [x] Implementar animação happy (sorriso + olhos brilhando + sparkle)
- [x] Implementar animação clap (bate palminhas)
- [x] Implementar animação jump (pulinho rápido)
- [x] Implementar animação spin (giro 360°)
- [x] Implementar animação thinking (visor com luz pulsante)
- [x] Implementar reverência japonesa (inclinação + braços juntos)

## Fase 3: Estrutura do Questionário
- [x] Criar Bloco 1 - Informações do negócio
  - [x] Campo: Cidade/Região de atuação
  - [x] Campo: Possui site? Qual?
  - [x] Campo: Oferta principal
  - [x] Campo: Ticket médio ou tabela
  - [x] Campo: Volume médio de atendimentos por semana
  - [x] Botão: Enviar respostas
  - [x] Lógica: Avatar happy → thinking, avança para Bloco 2

- [x] Criar Bloco 2 - Público & Operações
  - [x] Campo: Principais objeções do público
  - [x] Campo: Como funciona o atendimento atual
  - [x] Campo: Horários de atendimento
  - [x] Campo: Formas de pagamento aceitas
  - [x] Campo: Usa algum sistema de gestão?
  - [x] Campo: Existe mensagem-chave da marca?
  - [x] Botão: Enviar respostas
  - [x] Lógica: Avatar clap → thinking, avança para Bloco 3

- [x] Criar Bloco 3 - IA & Expectativas
  - [x] Campo: O que a IA deve fazer
  - [x] Campo: O que NÃO deve fazer
  - [x] Campo: Tom de voz da IA
  - [x] Campo: Função principal da IA
  - [x] Campo: Tarefas manuais que gostaria de automatizar
  - [x] Botão: Enviar respostas
  - [x] Lógica: Avatar happy, transição animada para Funil

## Fase 4: Telas de Transição e CRM Demonstrativo
- [x] Criar tela de Transição
  - [x] Tela escura com luz neon fluida
  - [x] Avatar faz reverência japonesa
  - [x] Mensagem: "Ótimo trabalho! Agora vamos estruturar o seu funil de vendas."
  - [x] Botão: Ver exemplo de CRM

- [x] Criar tela de CRM Demonstrativo (Kanban fixo)
  - [x] Coluna: Novo Lead
  - [x] Coluna: Conversa
  - [x] Coluna: Qualificado
  - [x] Coluna: Proposta
  - [x] Coluna: Fechamento
  - [x] Cards fictícios em cada coluna
  - [x] Botão: Criar meu funil personalizado

## Fase 5: Funil Personalizado (Kanban Editável)
- [x] Criar tela de Funil Personalizado
  - [x] Funcionalidade: Criar novas colunas
  - [x] Funcionalidade: Renomear colunas
  - [x] Funcionalidade: Excluir colunas
  - [ ] Funcionalidade: Reordenar colunas (drag & drop)
  - [x] Visualizar cards vazios
  - [x] Botão final: Finalizar e salvar informações
  - [x] Lógica: Avatar clap + happy ao enviar

## Fase 6: Tela Final
- [x] Criar tela Final de Agradecimento
  - [x] Avatar faz reverência de agradecimento
  - [x] Mensagem: "Tudo certo! Suas respostas foram enviadas com sucesso."
  - [x] Botão opcional: Reiniciar

## Fase 7: Integração e Deploy
- [x] Testar fluxo completo da aplicação
- [x] Salvar checkpoint do projeto
- [ ] Preparar repositório GitHub
- [ ] Fazer deploy no GitHub


## Ajustes Solicitados
- [x] Substituir avatar por novo design (imagem SVG/PNG)
- [x] Remover "ou tabela" do campo de Ticket médio no Bloco 1


## Ajustes Adicionais
- [x] Remover fundo branco do avatar
- [x] Criar avatar animado com SVG (sem fundo branco)
- [x] Implementar animações: movimento, bater palmas, piscar, sorrir
- [x] Remover obrigatoriedade dos campos do formulário (required=false)

- [x] Adicionar ícone redondo com imagem do robô
- [x] Implementar efeitos de brilho ao enviar respostas
