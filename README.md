# 🧬 Questionário Gamificado CRM

Uma aplicação web interativa e gamificada para coleta de informações de negócios, com avatar animado e transição para criação de funil de vendas estilo CRM.

## ✨ Características Principais

### 🤖 Avatar Animado
- Componente Avatar com aparência moderna e fofa
- 7 estados de animação diferentes:
  - **Idle**: Levitação suave contínua
  - **Blinking**: Piscar realista automático
  - **Happy**: Sorriso com olhos brilhando e efeito sparkle
  - **Clap**: Bate palminhas animado
  - **Jump**: Pulinho rápido e divertido
  - **Spin**: Giro 360°
  - **Thinking**: Visor com luz pulsante
  - **Bow**: Reverência japonesa elegante

### 📋 Questionário em 3 Blocos
1. **Bloco 1 - Informações do Negócio**
   - Cidade/Região de atuação
   - Presença online (website)
   - Oferta principal
   - Ticket médio
   - Volume de atendimentos

2. **Bloco 2 - Público & Operações**
   - Principais objeções do público
   - Processo de atendimento
   - Horários de funcionamento
   - Formas de pagamento
   - Sistema de gestão utilizado
   - Mensagem-chave da marca

3. **Bloco 3 - IA & Expectativas**
   - Funções da IA
   - Limitações da IA
   - Tom de voz desejado
   - Função principal
   - Tarefas a automatizar

### 🎯 Fluxo de Experiência
- **Transição Animada**: Tela escura com luz neon fluida e avatar fazendo reverência
- **CRM Demonstrativo**: Kanban fixo com 5 colunas e cards de exemplo
- **Funil Personalizado**: Kanban editável para customização completa
- **Tela Final**: Agradecimento com animação de confete

## 🎨 Design

- **Tema**: Dark premium com cores azul/ciano neon
- **Estilo**: Futurista, minimalista, elegante
- **Animações**: Framer Motion para transições suaves
- **Responsividade**: Totalmente responsivo em todos os dispositivos

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS 4 + CSS variables
- **Animações**: Framer Motion
- **Backend**: Express 4 + tRPC 11
- **Database**: MySQL/TiDB com Drizzle ORM
- **Auth**: Manus OAuth integrado

## 🚀 Como Começar

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/DevOpsVX/gamified-crm-app.git
cd gamified-crm-app

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
pnpm dev
```

### Variáveis de Ambiente Necessárias

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=your_oauth_server_url
```

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── components/
│   │   ├── Avatar.tsx           # Componente Avatar animado
│   │   ├── QuestionnaireBlock.tsx # Container para blocos
│   │   ├── FormField.tsx         # Campo de formulário
│   │   └── Kanban.tsx            # Kanban board editável
│   ├── pages/
│   │   ├── Block1.tsx            # Bloco 1 - Negócio
│   │   ├── Block2.tsx            # Bloco 2 - Público & Ops
│   │   ├── Block3.tsx            # Bloco 3 - IA & Expectativas
│   │   ├── Transition.tsx        # Tela de transição
│   │   ├── CRMDemo.tsx           # CRM demonstrativo
│   │   ├── CustomFunnel.tsx      # Funil personalizado
│   │   ├── FinalScreen.tsx       # Tela final
│   │   └── Home.tsx              # Navegação principal
│   ├── App.tsx                   # Configuração da app
│   ├── index.css                 # Estilos globais com tema dark
│   └── main.tsx                  # Entry point

server/
├── routers.ts                    # Procedimentos tRPC
├── db.ts                         # Helpers de database
└── _core/                        # Framework internals

drizzle/
└── schema.ts                     # Definição de tabelas
```

## 🔧 Desenvolvimento

### Adicionar Nova Funcionalidade

1. Atualizar schema em `drizzle/schema.ts`
2. Executar `pnpm db:push` para migrar
3. Adicionar helpers em `server/db.ts`
4. Criar procedimentos em `server/routers.ts`
5. Consumir com `trpc.*.useQuery/useMutation` no frontend

### Testes

```bash
# Executar testes
pnpm test

# Modo watch
pnpm test:watch
```

## 📦 Build para Produção

```bash
pnpm build
pnpm start
```

## 🌐 Deploy

O projeto está pronto para deploy em plataformas que suportam Node.js:

- **Vercel**: Suporte nativo para Next.js (considere migrar)
- **Railway**: Excelente para full-stack Node.js
- **Render**: Suporte para Express + React
- **Heroku**: Suporte clássico para Node.js

## 📝 Licença

MIT

## 👨‍💻 Autor

Desenvolvido com ❤️ para criar experiências gamificadas incríveis.

---

**Repositório GitHub**: [DevOpsVX/gamified-crm-app](https://github.com/DevOpsVX/gamified-crm-app)
