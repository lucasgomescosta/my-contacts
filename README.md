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
- Vitest 4 + Testing Library
- Playwright
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
- `npm test`: executa o Vitest em modo watch
- `npm run test:run`: executa os testes uma vez, sem watch
- `npm run test:e2e`: executa testes E2E com Playwright
- `npm run test:e2e:ui`: abre a interface visual do Playwright
- `npm run test:e2e:headed`: executa E2E com browser visivel
- `npm run test:e2e:debug`: executa E2E em modo debug
- `npm run test:e2e:report`: abre o relatorio HTML do Playwright
- `npm run eject`: expoe configuracoes do CRA (irreversivel)

## Testes

### Vitest (unitarios e integracao)

A suite com Vitest cobre:

- `utils` e camada de infraestrutura
- `services` e `mappers`
- hooks reutilizaveis e hooks de paginas
- componentes e formularios
- paginas
- `AuthContext` e `AuthGuard`

Comandos:

```bash
npm test
npm run test:run
```

### Playwright (E2E)

Foi adicionado setup E2E com configuracao em `playwright.config.js` e specs iniciais em `e2e/`:

- `e2e/routing.spec.js`: validacao de guardas de rota para usuario nao autenticado
- `e2e/auth.spec.js`: fluxos de sign-in e sign-up com interceptacao de rede

Comandos:

```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:headed
npm run test:e2e:debug
npm run test:e2e:report
```

## Guia de Estudo

Foi adicionado um guia de estudo/revisao para a estrategia de testes em:

- `docs/TESTING_STUDY_GUIDE_VITEST_PLAYWRIGHT.md`

## CI (Vitest + Playwright)

Para validar testes automaticamente em Pull Requests, voce pode usar GitHub Actions.

Fluxo recomendado no CI:

1. Instalar dependencias
2. Executar testes Vitest
3. Instalar browsers do Playwright
4. Executar testes E2E
5. Publicar artefatos de falha (report)

Exemplo de workflow (`.github/workflows/tests.yml`):

```yaml
name: tests

on:
	pull_request:
	push:
		branches: [main]

jobs:
	test:
		runs-on: ubuntu-latest

		steps:
			- name: Checkout
				uses: actions/checkout@v4

			- name: Setup Node
				uses: actions/setup-node@v4
				with:
					node-version: 20
					cache: npm

			- name: Install dependencies
				run: npm ci

			- name: Run unit/integration tests
				run: npm run test:run

			- name: Install Playwright browsers
				run: npx playwright install --with-deps chromium

			- name: Run E2E tests
				run: npm run test:e2e

			- name: Upload Playwright report
				if: always()
				uses: actions/upload-artifact@v4
				with:
					name: playwright-report
					path: playwright-report
```

Observacoes:

1. O projeto ja possui `webServer` no `playwright.config.js`, entao o app sobe automaticamente durante os testes E2E.
2. Em caso de falha, use `npm run test:e2e:report` localmente para abrir o relatorio HTML.

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
e2e/
docs/
```

## Screenshots

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

### Excluir Contato

![Excluir Contato](public/screenshots/excluir-contato.PNG)

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
