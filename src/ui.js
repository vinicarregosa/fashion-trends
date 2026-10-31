// Manipulação do DOM e eventos da página.
import {
  atualizarProduto,
  criarProduto,
  estaIndisponivel,
  filtrarPorNome,
  ordenarPorNome,
  removerProduto,
  validarProduto,
} from './produto.js';
import { carregarProdutos, salvarProdutos } from './storage.js';

const NOMES_CAMPOS = ['nome', 'preco', 'quantidade'];
const DURACAO_MENSAGEM_MS = 4000;

const formatoPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function selecionar(seletor, raiz = document) {
  const elemento = raiz.querySelector(seletor);
  if (!elemento) throw new Error(`Elemento não encontrado: ${seletor}`);
  return elemento;
}

const formulario = selecionar('#form-produto');
const tituloFormulario = selecionar('#titulo-cadastro');
const botaoSalvar = selecionar('#botao-salvar');
const botaoCancelar = selecionar('#botao-cancelar');
const campoBusca = selecionar('#busca');
const lista = selecionar('#lista-produtos');
const listaVazia = selecionar('#lista-vazia');
const contador = selecionar('#contador');
const mensagem = selecionar('#mensagem');
const modeloProduto = selecionar('#modelo-produto');

let idEmEdicao = null;
let temporizadorMensagem;

function campoDoFormulario(campo) {
  return selecionar(`#${campo}`);
}

function mostrarErros(erros) {
  for (const campo of NOMES_CAMPOS) {
    const erro = erros[campo] ?? '';
    selecionar(`#erro-${campo}`).textContent = erro;
    campoDoFormulario(campo).ariaInvalid = erro ? 'true' : null;
  }

  const primeiroInvalido = NOMES_CAMPOS.find((campo) => erros[campo]);
  if (primeiroInvalido) campoDoFormulario(primeiroInvalido).focus();
}

function mostrarMensagem(texto, tipo = 'sucesso') {
  window.clearTimeout(temporizadorMensagem);
  mensagem.textContent = texto;
  mensagem.dataset.tipo = tipo;
  temporizadorMensagem = window.setTimeout(() => {
    mensagem.textContent = '';
  }, DURACAO_MENSAGEM_MS);
}

function descreverEstoque(produto) {
  if (estaIndisponivel(produto)) return 'Indisponível';
  return produto.quantidade === 1 ? '1 disponível' : `${produto.quantidade} disponíveis`;
}

function criarItem(produto) {
  const item = selecionar('li', modeloProduto.content).cloneNode(true);

  selecionar('.produto-nome', item).textContent = produto.nome;
  selecionar('.produto-preco', item).textContent = formatoPreco.format(produto.preco);
  selecionar('.produto-estoque', item).textContent = descreverEstoque(produto);
  item.classList.toggle('produto-indisponivel', estaIndisponivel(produto));
  item.classList.toggle('produto-em-edicao', produto.id === idEmEdicao);
  item.dataset.id = produto.id;

  const botaoEditar = selecionar('[data-acao="editar"]', item);
  botaoEditar.ariaLabel = `Editar ${produto.nome}`;
  botaoEditar.addEventListener('click', () => iniciarEdicao(produto));

  const botaoExcluir = selecionar('[data-acao="excluir"]', item);
  botaoExcluir.ariaLabel = `Excluir ${produto.nome}`;
  botaoExcluir.addEventListener('click', () => excluirProduto(produto));

  return item;
}

function descreverContagem(visiveis, total) {
  const totalTexto = total === 1 ? '1 produto' : `${total} produtos`;
  return visiveis === total ? totalTexto : `${visiveis} de ${totalTexto}`;
}

function renderizarLista() {
  const todos = ordenarPorNome(carregarProdutos());
  const termo = campoBusca.value;
  const visiveis = filtrarPorNome(todos, termo);

  lista.replaceChildren(...visiveis.map(criarItem));
  contador.textContent = descreverContagem(visiveis.length, todos.length);
  listaVazia.hidden = visiveis.length > 0;
  listaVazia.textContent =
    todos.length === 0
      ? 'Nenhum produto cadastrado ainda.'
      : `Nenhum produto encontrado para "${termo.trim()}".`;
}

function salvarLista(novaLista, textoSucesso) {
  if (!salvarProdutos(novaLista)) {
    mostrarMensagem('Não foi possível salvar. Verifique o armazenamento do navegador.', 'erro');
    return false;
  }

  renderizarLista();
  mostrarMensagem(textoSucesso);
  return true;
}

// Alterna o formulário entre cadastro (null) e edição do produto informado.
function definirEdicao(produto) {
  idEmEdicao = produto?.id ?? null;
  tituloFormulario.textContent = produto ? 'Editar produto' : 'Cadastrar produto';
  botaoSalvar.textContent = produto ? 'Salvar' : 'Cadastrar';
  botaoCancelar.hidden = !produto;
  mostrarErros({});
  renderizarLista();
}

function iniciarEdicao(produto) {
  definirEdicao(produto);
  campoDoFormulario('nome').value = produto.nome;
  campoDoFormulario('preco').value = produto.preco.toFixed(2).replace('.', ',');
  campoDoFormulario('quantidade').value = String(produto.quantidade);
  campoDoFormulario('nome').focus();
}

function sairDaEdicao() {
  formulario.reset();
  definirEdicao(null);
}

// Devolve o foco ao botão do item, o que também rola a página até ele.
function concluirEdicao() {
  const seletor = `[data-id="${CSS.escape(idEmEdicao ?? '')}"] [data-acao="editar"]`;
  sairDaEdicao();
  lista.querySelector(seletor)?.focus();
}

function salvarCampos(campos) {
  const produtos = carregarProdutos();

  return idEmEdicao === null
    ? salvarLista([...produtos, criarProduto(campos)], `"${campos.nome}" cadastrado.`)
    : salvarLista(atualizarProduto(produtos, idEmEdicao, campos), `"${campos.nome}" atualizado.`);
}

function aoEnviarFormulario(evento) {
  evento.preventDefault();

  const dados = Object.fromEntries(new FormData(formulario));
  const resultado = validarProduto(dados);
  mostrarErros(resultado.valido ? {} : resultado.erros);
  if (!resultado.valido) return;

  campoBusca.value = '';
  if (!salvarCampos(resultado.campos)) return;

  if (idEmEdicao === null) {
    formulario.reset();
    campoDoFormulario('nome').focus();
  } else {
    concluirEdicao();
  }
}

function excluirProduto(produto) {
  if (!window.confirm(`Excluir "${produto.nome}"? Essa ação não pode ser desfeita.`)) return;

  const excluiu = salvarLista(
    removerProduto(carregarProdutos(), produto.id),
    `"${produto.nome}" excluído.`,
  );

  if (excluiu && produto.id === idEmEdicao) sairDaEdicao();
}

export function iniciarUI() {
  formulario.addEventListener('submit', aoEnviarFormulario);
  botaoCancelar.addEventListener('click', concluirEdicao);
  campoBusca.addEventListener('input', renderizarLista);
  renderizarLista();
}
