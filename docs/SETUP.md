# Setup do FashionTrends

As ferramentas do projeto, o que cada arquivo de configuração faz e como rodá-lo.

## Ferramentas

| Ferramenta | Versão |
| --- | --- |
| Node.js | 24.19.0 |
| npm | 11.17.0 |
| Vite | 8.3.5 |

## Arquivos de configuração

### `package.json`

Descreve o projeto para o npm: nome, scripts e dependências.

| Campo | Função |
| --- | --- |
| `private: true` | Impede a publicação acidental do projeto no registro do npm. |
| `type: "module"` | Faz o Node tratar arquivos `.js` como módulos ES (`import`/`export`). |
| `scripts` | Atalhos executados com `npm run <nome>`. Ver [Como rodar](#como-rodar). |
| `devDependencies` | Ferramentas usadas só no desenvolvimento. Aqui, apenas o `vite`. |

O projeto não tem `dependencies`, ou seja, nenhuma biblioteca é enviada ao navegador.

O símbolo em `^8.3.5` aceita atualizações de versões menores (8.x). O `package-lock.json` registra as versões exatas instaladas, para que todos usem as mesmas.

### `vite.config.js`

É o arquivo de configuração do Vite, a ferramenta que serve a página em desenvolvimento e gera os arquivos finais.

Ele está vazio de propósito. Os padrões do Vite (servidor na porta 5173, saída em `dist/`) atendem ao projeto, e o Vite funcionaria até sem esse arquivo. Ele fica no projeto como o lugar certo para ajustes futuros.

## Sem verificação de tipos

O projeto é escrito em JavaScript e não tem passo de compilação. O build só empacota os arquivos, sem conferir os tipos. Na prática:

- **Erro de tipo:** só aparece com a aplicação rodando.
- **Dado que pode faltar:** a pessoa que escreve o código precisa lembrar de tratar o `null`.
- **Modelo `Produto`:** é um comentário JSDoc, que só serve de documentação.

Por exemplo, chamar `validarProduto()` sem argumento não impede o `npm run build`. O erro só aparece no navegador. Por isso, testar cada funcionalidade no navegador é a principal proteção.

Os dados que vêm de fora do programa são conferidos com a aplicação rodando. É o caso de `ehProduto`, que confere os dados vindos do `localStorage`.

## Como rodar

É preciso ter Node.js em uma versão aceita pelo Vite 8 (`^20.19.0` ou `>=22.12.0`).

```bash
npm install       # instala as dependências (só na primeira vez)
npm run dev       # servidor de desenvolvimento
npm run build     # gera os arquivos finais
npm run preview   # serve localmente o resultado do build
```

- **`npm run dev`** abre o servidor em `http://localhost:5173` (o endereço aparece no terminal). A página atualiza sozinha ao salvar um arquivo.
- **`npm run build`** executa `vite build`. Os arquivos finais vão para `dist/`.

## Estrutura de pastas

```text
fashionTrends-js/
├── index.html          # esqueleto da página: cadastro, busca e listagem
├── src/
│   ├── main.js         # ponto de entrada; carrega os estilos e inicia a interface
│   ├── produto.js      # modelo Produto, validações e operações sobre a lista
│   ├── storage.js      # leitura e escrita no localStorage
│   ├── ui.js           # manipulação do DOM e eventos
│   └── style.css       # variáveis de cor e layout mobile-first
├── docs/
│   ├── SETUP.md        # este arquivo
│   └── ARQUITETURA.md  # separação de responsabilidades e fluxo
├── CONTEXT.md          # visão geral do problema e da solução
├── README.md           # apresentação do projeto
├── package.json        # nome, scripts e dependências
├── package-lock.json   # versões exatas instaladas
├── vite.config.js      # configuração do Vite
└── .gitignore          # exclui node_modules/ e dist/ do Git
```

## Estado atual

O MVP está implementado: cadastro, listagem, pesquisa, edição, exclusão, validação e indicação de produtos indisponíveis. A validação com um comerciante real ainda não foi feita.

## Limitações conhecidas

- **Dados locais:** os produtos ficam só no navegador e no dispositivo usados. Limpar os dados do navegador apaga o catálogo.
- **Teste no celular pela rede local:** o id do produto vem de `crypto.randomUUID()`, que o navegador só libera em `localhost` ou `https`. Por isso, abrir o `npm run dev` no celular por um endereço `http://192.168...` faz o cadastro falhar. Em uma hospedagem com `https`, o cadastro não tem esse problema.
