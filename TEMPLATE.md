# Guia de Template — my-contacts

Este projeto serve como base para criar novos projetos React com CRUD completo. Abaixo estão os passos para reutilizá-lo e, opcionalmente, adicionar TypeScript.

---

## 1. Criando um novo projeto a partir deste template

### 1.1 Copiar o projeto

```bash
cp -r my-contacts meu-novo-projeto
cd meu-novo-projeto
```

### 1.2 Resetar o Git

```bash
rm -rf .git
git init
git add .
git commit -m "chore: initial commit from template"
```

### 1.3 Instalar dependências

```bash
npm install
```

### 1.4 Variável de ambiente

Crie um `.env` na raiz com a URL da sua API:

```env
REACT_APP_API_URL=http://localhost:3333
```

> O cliente HTTP já está configurado em `src/utils/api.js` para ler essa variável.

---

## 2. O que renomear / adaptar para o novo domínio

| O que mudar                                    | Onde fica                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| Nome das entidades (ex: `Contact` → `Product`) | `src/services/`, `src/pages/`, `src/components/`                       |
| Endpoints da API                               | `src/services/ContactsService.js`, `src/services/CategoriesService.js` |
| Mappers (formato do payload)                   | `src/services/mappers/ContactMapper.js`, `CategoryMapper.js`           |
| Rotas                                          | `src/Routes.js`                                                        |
| Nome do app no `package.json`                  | `package.json` → campo `"name"`                                        |
| Cores e tema                                   | `src/assets/styles/themes/default.js`                                  |
| Estilos globais                                | `src/assets/styles/global.js`                                          |

### Estrutura de pastas sugerida para novo domínio

```
src/
  services/
    ProdutosService.js        # equivalente ao ContactsService
    mappers/
      ProdutoMapper.js        # toPersistence / toDomain
  pages/
    Home/                     # listagem principal
    NewItem/                  # criação
    EditItem/                 # edição
```

---

## 3. O que já está pronto e pode ser reutilizado sem mudança

- `src/utils/apiService.js` — wrapper do axios com tratamento de erros
- `src/utils/api.js` — cliente axios configurado
- `src/utils/toast.js` — disparo de notificações
- `src/utils/formatPhone.js` — máscara de telefone (remova se não precisar)
- `src/utils/isValidEmail.js` — validação de e-mail
- `src/hooks/useErrors.js` — gerenciamento de erros de formulário
- `src/hooks/useAnimatedList.js` — animação de listas
- `src/hooks/useAnimatedUnmounted.js` — animação de saída de componentes
- `src/hooks/useIsMounted.js` — segurança em async com componente desmontado
- `src/hooks/useSafeAsyncAction.js` / `useSafeAsyncState.js`
- `src/lib/EventManager.js` — sistema de eventos global (usado pelo Toast)
- Componentes: `Toast`, `Modal`, `Loader`, `Spinner`, `FormGroup`, `PageHeader`, `ReactPortal`, `Button`, `Input`, `Select`

---

## 4. Adicionando TypeScript

### 4.1 Instalar dependências

```bash
npm install --save-dev typescript @types/react @types/react-dom @types/node
npm install --save-dev @types/styled-components
```

> `react-scripts` já suporta TypeScript nativamente — basta ter o `tsconfig.json`.

### 4.2 Criar o tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### 4.3 Renomear os arquivos

| Antes                           | Depois  |
| ------------------------------- | ------- |
| `*.js` (componentes/páginas)    | `*.tsx` |
| `*.js` (hooks, services, utils) | `*.ts`  |

Pode fazer gradualmente: o `allowJs: true` no `tsconfig.json` permite que arquivos `.js` e `.ts`/`.tsx` coexistam durante a migração.

### 4.4 Principais pontos que precisam de tipagem

**Mappers** — tipar os contratos de entrada e saída:

```ts
// src/services/mappers/ContactMapper.ts
interface PersistenceContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category_id: string;
  category_name: string;
}

interface DomainContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: { id: string; name: string };
}
```

**Services** — retornos das funções:

```ts
export async function listContacts(
  orderBy?: "asc" | "desc",
): Promise<DomainContact[]>;
export async function getContactById(id: string): Promise<DomainContact>;
```

**Hooks customizados** — ex: `useErrors`:

```ts
interface FieldError {
  field: string;
  message: string;
}
```

**Componentes** — tipar as props com `interface` ou `type`:

```tsx
// Antes (prop-types)
Button.propTypes = { ... }

// Depois (TypeScript)
interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  danger?: boolean;
  onClick?: () => void;
}
```

**Styled-components** — tipar props de estilo:

```ts
interface StyledButtonProps {
  $danger?: boolean;
}
const StyledButton = styled.button<StyledButtonProps>`...`;
```

### 4.5 Atualizar o ESLint

Instale o parser do TypeScript:

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Atualize o `eslint.config.mjs` adicionando suporte a `.ts`/`.tsx`:

```js
files: ["**/*.{js,jsx,ts,tsx}"],
```

### 4.6 Remover prop-types

Com TypeScript ativo, `prop-types` se torna redundante. Após migrar os componentes:

```bash
npm uninstall prop-types
```

---

## 5. Checklist de novo projeto

- [ ] Copiar e reiniciar Git
- [ ] Criar `.env` com `REACT_APP_API_URL`
- [ ] Renomear entidades nos services e mappers
- [ ] Atualizar rotas em `Routes.js`
- [ ] Ajustar tema em `themes/default.js`
- [ ] _(Opcional)_ Criar `tsconfig.json` e renomear arquivos para `.ts`/`.tsx`
- [ ] _(Opcional)_ Remover `prop-types` após migrar para TypeScript
