# MyContacts Frontend

Aplicação frontend para gerenciamento de contatos e categorias, desenvolvida com React, com foco em organização de código, experiência de uso e boas práticas de desenvolvimento frontend.

O projeto conta com autenticação, refresh token, paginação, busca, feedback visual via toasts e integração com API REST.

## Visao Geral

O **MyContacts Frontend** foi desenvolvido como uma aplicação moderna para gestão de contatos, buscando uma estrutura simples, escalável e de fácil manutenção.
A arquitetura do projeto segue uma separação clara de responsabilidades:

- `pages`: composicao de telas da aplicação
- `components`: componentes reutilizaveis e formulários
- `hooks`: regras de estado, efeitos e comportamentos reutilizáveis
- `services`: integracao com API
- `contexts`: gerenciamento de estados globais, como autenticação
- `utils`: funções utilitárias, validações, formatações e configurações auxiliares

## Funcionalidades

- Cadastro de usuários
- Login com autenticação
- Refresh token para renovação de sessão
- Persistência de sessão no `localStorage`
- Proteção de rotas autenticadas
- Listagem de contatos
- Busca de contatos
- Paginação de resultados
- Cadastro, edição e exclusão de contatos
- Gerenciamento de categorias
- Feedback visual com mensagens toast
- Integração com API REST
- Tratamento de respostas `401 Unauthorized`

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

O `AuthContext` é responsável por:

- armazenar os dados do usuário autenticado;
- controlar login e logout;
- injetar o header Authorization: Bearer <token> nas requisições autenticadas;
- ignorar o header de autorização em rotas públicas de autenticação;
- tentar renovar a sessão automaticamente ao receber respostas 401 Unauthorized, quando existir refresh token válido.

## Estrutura de Pastas (Resumo)

```text
src/
├── components/
├── config/
├── contexts/
├── hooks/
├── pages/
├── services/
└── utils/
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

Alguns pontos aplicados no projeto:

- separação de responsabilidades por camadas;
- componentes reutilizáveis para formulários e interface;
- regras de estado centralizadas em hooks;
- validações por campo utilizando useErrors;
- comunicação com API isolada em services;
- configuração centralizada do Axios;
- autenticação gerenciada via contexto global;
- tratamento de sessão expirada com refresh token;
- código organizado para facilitar manutenção e evolução.

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

## Melhorias Futuras

Algumas evoluções possíveis para o projeto:

- adicionar testes unitários para hooks e componentes;
- melhorar cobertura de testes para autenticação;
- criar paginação mais avançada com infinite scroll;
- adicionar loading skeletons;
- melhorar tratamento global de erros;
- documentar melhor a API backend utilizada;
- adicionar pipeline de CI/CD;
- adicionar deploy em ambiente cloud.

## Contribuicao

1. Crie uma branch de feature
2. Faça commits pequenos e descritivos
3. Abra PR com contexto da alteracao, impacto e como testar

## Licenca

Definir conforme a politica do repositorio.
