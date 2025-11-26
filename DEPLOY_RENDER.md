# 🚀 Guia de Deploy no Render

Este documento fornece instruções passo a passo para fazer o deploy da aplicação Questionário Gamificado CRM no Render.

## ✅ Pré-requisitos

1. **Conta no Render**: Acesse [render.com](https://render.com) e crie uma conta gratuita
2. **Repositório GitHub**: O projeto já está no GitHub em `https://github.com/DevOpsVX/gamified-crm-app`
3. **Variáveis de ambiente**: Você precisará configurar as variáveis necessárias

## 📋 Passo 1: Conectar o Render ao GitHub

1. Faça login no [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** no canto superior direito
3. Selecione **"Web Service"**
4. Clique em **"Connect a repository"**
5. Procure por `gamified-crm-app` ou conecte sua conta GitHub
6. Selecione o repositório `DevOpsVX/gamified-crm-app`
7. Clique em **"Connect"**

## ⚙️ Passo 2: Configurar o Serviço Web

Preencha os seguintes campos:

### Informações Básicas
- **Name**: `gamified-crm-app` (ou o nome que preferir)
- **Environment**: `Node`
- **Region**: Selecione a região mais próxima (ex: São Paulo - `sao-paulo`)
- **Branch**: `main`

### Build Command
```bash
pnpm install && pnpm build
```

### Start Command
```bash
pnpm start
```

## 🔐 Passo 3: Configurar Variáveis de Ambiente

Antes de fazer o deploy, você precisa adicionar as variáveis de ambiente. No formulário do Render:

1. Role para baixo até a seção **"Environment"**
2. Clique em **"Add Environment Variable"**
3. Adicione as seguintes variáveis:

```
DATABASE_URL=<sua_url_do_banco_de_dados>
JWT_SECRET=<gere_uma_chave_segura>
VITE_APP_ID=<seu_app_id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im
OWNER_OPEN_ID=<seu_open_id>
OWNER_NAME=<seu_nome>
VITE_APP_TITLE=Questionário Gamificado CRM
VITE_APP_LOGO=/logo.png
BUILT_IN_FORGE_API_URL=<url_da_api>
BUILT_IN_FORGE_API_KEY=<sua_chave_api>
VITE_FRONTEND_FORGE_API_KEY=<chave_frontend>
VITE_FRONTEND_FORGE_API_URL=<url_frontend>
```

### Como Gerar JWT_SECRET

Execute no seu terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📦 Passo 4: Configurar Banco de Dados

O Render oferece suporte a PostgreSQL e MySQL. Para este projeto, recomendamos:

### Opção 1: Usar MySQL do Render (Recomendado)

1. No Render Dashboard, clique em **"New +"**
2. Selecione **"MySQL"**
3. Configure:
   - **Name**: `gamified-crm-db`
   - **Database Name**: `gamified_crm`
   - **User**: `admin`
   - **Region**: Mesma região do Web Service
4. Clique em **"Create Database"**
5. Copie a **"Internal Database URL"** e adicione como `DATABASE_URL` no Web Service

### Opção 2: Usar Banco de Dados Externo

Se você já tem um banco de dados MySQL hospedado em outro lugar, simplesmente adicione a URL de conexão como `DATABASE_URL`.

## 🚀 Passo 5: Deploy

1. Revise todas as configurações
2. Clique em **"Create Web Service"**
3. O Render iniciará automaticamente o build e o deploy
4. Aguarde até ver a mensagem **"Your service is live"**
5. Clique no link gerado para acessar sua aplicação

## 📊 Monitoramento e Logs

Após o deploy:

1. Acesse o **Render Dashboard**
2. Selecione seu Web Service
3. Abra a aba **"Logs"** para ver os logs em tempo real
4. Use a aba **"Metrics"** para monitorar CPU, memória e requisições

## 🔄 Atualizações Futuras

Após fazer alterações no código:

1. Faça commit e push para o GitHub:
   ```bash
   git add -A
   git commit -m "sua mensagem"
   git push github main
   ```

2. O Render detectará automaticamente as mudanças e iniciará um novo deploy
3. Você pode acompanhar o progresso na aba **"Deploys"** do Render Dashboard

## 🛠️ Troubleshooting

### Build falha com erro de dependências
- Verifique se o `pnpm-lock.yaml` está no repositório
- Execute `pnpm install` localmente para atualizar o lock file
- Faça push novamente

### Aplicação não inicia
- Verifique os logs na aba **"Logs"** do Render
- Certifique-se de que todas as variáveis de ambiente estão configuradas
- Verifique se a conexão com o banco de dados está funcionando

### Banco de dados não conecta
- Teste a URL de conexão localmente
- Certifique-se de que o Render MySQL está na mesma região
- Verifique as credenciais do banco de dados

## 💡 Dicas de Produção

1. **Habilitar HTTPS**: O Render fornece certificados SSL automaticamente
2. **Configurar domínio customizado**: Na aba "Settings", adicione seu domínio
3. **Backups automáticos**: Se usar MySQL do Render, configure backups
4. **Monitorar performance**: Use a aba "Metrics" para identificar gargalos
5. **Auto-deploy**: O Render faz deploy automático a cada push no GitHub

## 📞 Suporte

Para dúvidas sobre o Render, visite:
- [Documentação do Render](https://render.com/docs)
- [Comunidade do Render](https://community.render.com)

---

**Status do Deploy**: ✅ Pronto para produção

Boa sorte com seu deploy! 🎉
