# Correção do Campo company_name

## Problema Identificado

O campo **"Nome da Empresa"** (company_name) estava sendo coletado no formulário Block1, mas **não estava sendo enviado ao banco de dados Supabase**, resultando em valores NULL na coluna `company_name` da tabela `user_responses`.

## Causa Raiz

O campo `companyName` era capturado no frontend (Block1.tsx) e validado como obrigatório, porém:
1. Não estava incluído no schema de validação do backend (routers.ts)
2. Não estava na interface TypeScript UserResponse (supabase.ts)
3. Não estava sendo passado na chamada `createResponse.mutateAsync()` no Home.tsx

## Correções Implementadas

### 1. **server/routers.ts**
- **Linha 33**: Adicionado `company_name: z.string().optional()` no schema de validação do endpoint `create`
- **Linha 62**: Adicionado `company_name: z.string().optional()` no schema de validação do endpoint `update`

### 2. **server/supabase.ts**
- **Linha 14**: Adicionado `company_name?: string;` na interface `UserResponse`

### 3. **client/src/pages/Home.tsx**
- **Linha 43**: Adicionado `company_name: data.companyName,` na chamada `createResponse.mutateAsync()`

## Resultado

Agora, quando um usuário preencher o formulário Block1 e enviar o campo "Nome da Empresa":
1. O valor será capturado corretamente do formulário
2. Será validado pelo schema Zod no backend
3. Será inserido na coluna `company_name` da tabela `user_responses` no Supabase

## Próximos Passos

1. **Fazer commit das alterações** no repositório Git
2. **Fazer deploy** da aplicação para aplicar as correções em produção
3. **Testar** o formulário preenchendo o campo "Nome da Empresa" e verificando se o valor é salvo corretamente no banco de dados

## Arquivos Modificados

- `server/routers.ts`
- `server/supabase.ts`
- `client/src/pages/Home.tsx`

## Nota Importante

A coluna `company_name` já existe no banco de dados Supabase (confirmado via MCP), portanto **não é necessário executar nenhuma migration** no banco de dados. As alterações são apenas no código da aplicação.
