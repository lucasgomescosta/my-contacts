# Guia de Estudo e Revisao - Vitest + Playwright

## 1. Objetivo do guia

Este documento e um material vivo para estudar, revisar e evoluir testes no projeto MyContacts.

Resultados esperados:

- Escrever testes unitarios e de integracao com Vitest sem dependencia de tentativa e erro.
- Escrever testes E2E com Playwright para fluxos criticos.
- Diagnosticar e corrigir falhas rapidamente (locators, mocks, timing, estado de auth).
- Manter uma suite estavel para evolucao continua do produto.

## 2. Mapa rapido (2 minutos)

- Vitest: valida logica isolada, hooks, componentes e paginas com mocks.
- Playwright: valida fluxo real no browser (roteamento, auth, interacao de usuario).
- Estrategia:
  - Primeiro cobertura de logica (rapido e barato).
  - Depois cobertura de fluxo critico (alto valor de confianca).

Pirâmide pratica:

1. Unitarios (utils, mappers, hooks)
2. Integracao UI (componentes, paginas, context/guards)
3. E2E (auth + rotas + fluxos principais)

## 3. Estado atual do projeto

### 3.1 Vitest

Comandos:

```bash
npm run test
npm run test:run
```

Cobertura implementada por camadas:

- Utils e infra
- Services e mappers
- Hooks reutilizaveis
- Componentes
- Paginas
- Hooks de paginas
- Contexto de auth e guard de rotas

### 3.2 Playwright

Comandos:

```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:headed
npm run test:e2e:debug
npm run test:e2e:report
```

Specs iniciais:

- e2e/routing.spec.js
- e2e/auth.spec.js

Configuracao:

- playwright.config.js

## 4. Fundamentos essenciais

## 4.1 Vitest - o que dominar

1. describe / it / expect
2. vi.fn, vi.mock, vi.spyOn
3. render e renderHook (Testing Library)
4. act / waitFor para update assincrono
5. Boas praticas de isolamento (beforeEach, clearAllMocks)

## 4.2 Playwright - o que dominar

1. test, expect, fixtures page/context
2. Locators robustos (getByRole, getByLabel, getByPlaceholder)
3. Auto-wait e asserts de navegacao
4. Mock de rede com page.route
5. Debug com trace/video/screenshot

## 5. Setup e padroes do projeto

## 5.1 Estrutura recomendada

- src/\*\*/<nome>.test.js
- src/\*\*/index.test.jsx
- e2e/\*.spec.js
- docs/TESTING_STUDY_GUIDE_VITEST_PLAYWRIGHT.md

## 5.2 Convencoes

1. Nome do teste descreve comportamento, nao implementacao.
2. Um teste, uma responsabilidade principal.
3. Evitar asserts redundantes que quebram facil com refactor visual.
4. Priorizar comportamento observavel pelo usuario.

## 6. Receitas praticas (copiar e adaptar)

## 6.1 Receita A - Hook com sucesso e erro

Checklist:

1. Mock da dependencia externa (service, query, toast)
2. Cenário de sucesso (expect principal)
3. Cenário de erro (fallback e feedback)
4. Reset de mocks no beforeEach

## 6.2 Receita B - Componente de formulario

Checklist:

1. Render com providers necessarios (ThemeProvider, Router)
2. Preencher campos
3. Validar botao habilitado/desabilitado
4. Validar submit chamado com payload correto

## 6.3 Receita C - Pagina com hook mockado

Checklist:

1. Mock do hook da pagina
2. Render e validacao dos elementos principais
3. Interacao e verificacao de wiring (handler passado e chamado)

## 6.4 Receita D - E2E de auth com mock de API

Checklist:

1. page.addInitScript para limpar localStorage
2. page.route para /auth/signin e endpoints auxiliares
3. Interacao real com UI (fill + click)
4. Assert de URL final e elementos de sessao

## 7. Debug e diagnostico

## 7.1 Quando um teste Vitest falhar

1. Ler a primeira assertion quebrada (nao a ultima).
2. Revisar se faltou act ou waitFor.
3. Validar se o mock foi resetado corretamente.
4. Verificar se teste depende de ordem de execucao.

## 7.2 Quando um teste Playwright falhar

1. Rodar headed/debug.
2. Abrir report HTML.
3. Verificar locator e timing.
4. Verificar interceptacoes de rede (URL exata + metodo).

## 8. Regras anti-flaky

1. Nao usar waits fixos por tempo (sleep).
2. Sempre preferir asserts orientadas a estado visivel.
3. Em E2E, usar locators semanticos.
4. Evitar acoplamento com classes CSS geradas.
5. Isolar dados por teste.

## 9. Checklist de PR para testes

1. Inclui teste de sucesso.
2. Inclui teste de erro/fallback.
3. Mocks foram limpos no ciclo do teste.
4. Nomes de testes explicam comportamento.
5. Nao introduziu log ruidoso em saida de teste.
6. Suite local passou (Vitest e, quando aplicavel, E2E).

## 10. Plano de estudo em 4 semanas

## Semana 1 - Base Vitest

- Revisar utils/services/hook simples.
- Reescrever 3 testes sem consultar.

## Semana 2 - UI e paginas

- Revisar componentes e paginas.
- Criar 2 testes novos de pagina sem copiar padrao pronto.

## Semana 3 - Playwright

- Revisar e2e/routing.spec.js e e2e/auth.spec.js.
- Adicionar 1 fluxo E2E novo (ex.: sign-out).

## Semana 4 - Consolidacao

- Rodar revisao geral.
- Melhorar 3 testes antigos (legibilidade e robustez).
- Definir metas de cobertura para proximas features.

## 11. Banco de exercicios (pratica guiada)

1. Criar teste de erro de rede em um fluxo de formulario.
2. Criar teste de guard para rota nova privada.
3. Criar spec E2E para logout.
4. Criar spec E2E para tentativa de login invalido.

## 12. Proximos incrementos recomendados

1. E2E de CRUD de contatos com interceptacao de rede.
2. E2E de CRUD de categorias.
3. Workflow CI para Vitest + Playwright.
4. Metricas de tempo por suite para detectar regressao de performance.

## 13. Comandos de referencia rapida

```bash
# Vitest
npm run test
npm run test:run

# Playwright
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug
npm run test:e2e:report
```

---

Material criado para revisao continua. Atualize este guia junto com cada mudanca relevante na estrategia de testes.
