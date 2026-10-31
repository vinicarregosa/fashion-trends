# Arquitetura do FashionTrends

Como o código está organizado e por que essa organização é pequena.

## Visão geral

A aplicação roda inteira no navegador e se divide em três responsabilidades:

| Responsabilidade | Arquivo | Faz | Não faz |
| --- | --- | --- | --- |
| Interface (UI) | `src/ui.js` | Lê o formulário, reage a eventos e desenha a lista. | Decidir se um dado é válido. |
| Lógica de negócio | `src/produto.js` | Documenta o modelo `Produto`, valida seus dados e opera sobre a lista (atualizar, remover, ordenar, filtrar). | Acessar o DOM ou o `localStorage`. |
| Persistência | `src/storage.js` | Lê e grava os produtos no `localStorage`. | Acessar o DOM ou aplicar regras de negócio. |

O arquivo `src/main.js` é o ponto de entrada: ele carrega os estilos e inicia a interface.

A separação tem um benefício prático. As regras ficam em um só lugar, e uma mudança no visual da página não obriga a mexer nelas. Por exemplo, a regra "quantidade deve ser um inteiro >= 0" fica em `produto.js`, seja qual for o jeito de exibir o erro.

As dependências seguem uma única direção, e `produto.js` não depende de nenhum outro arquivo:

```text
main.js ──> ui.js ──> storage.js ──> produto.js
              │                          ▲
              └──────────────────────────┘
```

## O modelo `Produto`

Cada produto é um objeto simples, documentado com `@typedef` em `src/produto.js`:

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | texto | Único. É gerado por `criarProduto` com `crypto.randomUUID()`. |
| `nome` | texto | Não pode ficar vazio depois de removidos os espaços das pontas. |
| `preco` | número | Válido e não negativo. |
| `quantidade` | número | Inteiro maior ou igual a zero. Com `0`, o produto aparece como indisponível. |

As regras são conferidas em dois pontos. `validarProduto` recebe os textos do formulário e os converte para os tipos acima. `ehProduto` confere cada item lido do `localStorage`, porque esses dados podem ter sido alterados fora da aplicação.

## Fluxo de cadastro

```text
┌─────────────────────┐
│ Formulário          │  ui.js lê nome, preço e quantidade
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Validação           │  produto.js confere as regras de negócio
└──────────┬──────────┘
           ├── inválido ──> ui.js mostra os erros ao lado dos campos
           │                (nada é salvo)
           ▼ válido
┌─────────────────────┐
│ Storage             │  storage.js grava em JSON no localStorage
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ Listagem            │  ui.js redesenha a lista e mostra o feedback
└─────────────────────┘
```

Ao carregar a página, o caminho é mais curto: `storage.js` lê os produtos salvos e `ui.js` desenha a lista. Dados corrompidos resultam em lista vazia, sem quebrar a aplicação. Se só alguns itens estiverem inválidos, apenas eles são ignorados.

## Outros fluxos

- **Edição:** `iniciarEdicao` preenche o formulário e guarda o id em `idEmEdicao`. Ao enviar, `salvarCampos` vê esse id e chama `atualizarProduto`, que altera o registro existente em vez de criar outro.
- **Exclusão:** `excluirProduto` pede confirmação com `window.confirm`. Se a pessoa confirmar, `removerProduto` tira o item da lista. Se ele estava em edição, o formulário volta ao modo de cadastro.
- **Pesquisa:** cada digitação no campo de busca chama `renderizarLista`, que aplica `filtrarPorNome`. A comparação ignora acentos e maiúsculas, e o filtro muda só o que é exibido, não os dados salvos.
- **Produto indisponível:** `estaIndisponivel` verifica se a quantidade é `0`. Com isso, `criarItem` mostra "Indisponível" e aplica a classe `produto-indisponivel`.
- **Falha ao salvar:** `salvarProdutos` retorna `false` se o navegador recusar a gravação, e `salvarLista` mostra o erro em vez da mensagem de sucesso.

## Decisões de implementação

- **O `localStorage` é a fonte dos dados.** A lista não fica guardada em uma variável: cada operação lê os produtos salvos, altera e grava de novo. A única informação mantida em memória é qual produto está em edição. Isso evita ter duas cópias da lista que possam ficar diferentes.
- **Erros por campo.** `validarProduto` devolve um erro para cada campo inválido, em vez de uma lista única, porque as mensagens precisam aparecer ao lado do campo correspondente.
- **Preço e quantidade em campos de texto.** Com `type="text"` e `inputmode`, o celular ainda mostra o teclado numérico, e `59,90` funciona em qualquer idioma do aparelho. O preço aceita vírgula ou ponto e até duas casas decimais.
- **Texto do usuário entra por `textContent`.** Assim, um nome com HTML aparece como texto e nunca é interpretado pela página.
- **Lista antes do formulário no celular.** Consultar preços durante o atendimento é a ação mais frequente, então a pesquisa fica no topo, com um atalho para o cadastro.
- **Aviso no topo e sem receber cliques.** Embaixo, ele ficaria atrás do teclado do celular e chegou a bloquear o botão de salvar.
- **Lista em ordem alfabética.** Facilita encontrar um produto visualmente, sem exigir nenhuma funcionalidade nova.

## Por que não há camadas extras

Em projetos maiores é comum separar o código em camadas como *services* (coordenam regras de negócio), *repositories* (escondem de onde os dados vêm) e *controllers* (recebem as ações do usuário). Elas não são usadas aqui, pelos motivos abaixo:

- **O problema é pequeno.** São uma única entidade (`Produto`), sete funcionalidades e um único lugar de armazenamento.
- **Elas só repassariam chamadas.** Um `ProdutoService` receberia o produto de `ui.js` e o entregaria a `storage.js`, sem acrescentar nada.
- **Não há troca de armazenamento prevista.** Um repository compensa quando existe mais de uma fonte de dados. Aqui, o `localStorage` é a única, e `storage.js` já concentra todo o acesso a ele.
- **Cada camada tem custo.** É mais código para ler, testar e explicar, sem ganho para um problema deste tamanho.

Essa decisão pode mudar se o código crescer, por exemplo, se `ui.js` ficar difícil de entender por acumular responsabilidades demais.
