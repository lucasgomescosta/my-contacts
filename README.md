# MyContacts Frontend

Aplicacao frontend para gerenciamento de contatos e categorias, com autenticacao, paginacao, busca e feedback visual via toasts.

## Visao Geral

O projeto foi construido com React e adota uma arquitetura modular baseada em:

- `pages`: composicao de telas
- `components`: componentes reutilizaveis e formularios
- `hooks`: logica de estado e efeitos
- `services`: integracao com API
- `contexts`: autenticacao e estado global
- `utils`: utilitarios (validacoes, formatacoes, chamadas HTTP)

## Stack Tecnica

- React 19
- React Router DOM 7
- React Query (TanStack Query) 5
- Styled Components 6
- Axios
- ESLint
- Create React App (react-scripts)

## Requisitos

- Node.js 18+
- npm 9+

## Configuracao de Ambiente

Arquivo `.env`:

```env
DISABLE_ESLINT_PLUGIN=true
REACT_APP_API_URL=http://localhost:3001
WDS_SOCKET_PORT=0
```

Variaveis principais:

- `REACT_APP_API_URL`: URL base da API backend

## Como Executar

1. Instale dependencias:

```bash
npm install
```

2. Inicie o projeto em desenvolvimento:

```bash
npm start
```

3. Acesse no navegador:

`http://localhost:3000`

## Scripts Disponiveis

- `npm start`: inicia a aplicacao em modo desenvolvimento
- `npm run build`: gera build de producao em `build/`
- `npm test`: executa os testes
- `npm run eject`: expoe configuracoes do CRA (irreversivel)

## Autenticacao

Fluxo implementado:

- Cadastro: `POST /auth/signup`
- Login: `POST /auth/signin`
- Refresh token: `POST /refresh-token`

Tokens e dados de sessao sao persistidos no `localStorage` via chaves em `src/config/storageKeys.js`.

O `AuthContext`:

- injeta `Authorization: Bearer <token>` nas requisicoes autenticadas
- ignora header de autorizacao em rotas publicas de auth (`/auth/*`)
- tenta renovar sessao em respostas `401` quando houver refresh token valido

## Estrutura de Pastas (Resumo)

```text
src/
	components/
	contexts/
	hooks/
	pages/
	services/
	utils/
```

## Screenshots

A pasta `public/screenshots` contem imagens de exemplo para deixar o README mais visual.
Substitua os arquivos pelos screenshots reais sem mudar os nomes, assim os links abaixo continuam funcionando.

### Home

![Home](public/screenshots/home.PNG)

### Sign In

![Sign In](public/screenshots/sign-in.PNG)

### Sign Up

![Sign Up](public/screenshots/sign-up.PNG)

### Categorias

![Categorias](public/screenshots/categorias.PNG)

### Novo Contato

![Novo Contato](public/screenshots/novo-contato.PNG)

### Editar Contato

![Editar Contato](public/screenshots/editar-contato.PNG)

## Qualidade e Padroes

- Logica de formularios centralizada em hooks (`use...`)
- UI desacoplada em componentes de formulario reutilizaveis
- Validacoes por campo usando `useErrors`
- Comunicacao com API isolada em `services` e `utils/apiService`

## Infra Local (Opcional)

Existe `docker-compose.yml` com PostgreSQL para ambiente local:

```bash
docker compose up -d
```

Observacao: o frontend depende de uma API em `http://localhost:3001`.

## Troubleshooting

- Erro `401 Unauthorized` no cadastro/login:
  - confirme se os endpoints da API de auth estao ativos
  - limpe `localStorage` do navegador para remover tokens antigos
  - verifique `REACT_APP_API_URL`

- CORS no navegador:
  - habilite o frontend (`http://localhost:3000`) no backend

- Porta em uso:
  - altere a porta da API ou encerre o processo conflitando

## Contribuicao

1. Crie uma branch de feature
2. Faça commits pequenos e descritivos
3. Abra PR com contexto da alteracao, impacto e como testar

## Licenca

Definir conforme a politica do repositorio.
