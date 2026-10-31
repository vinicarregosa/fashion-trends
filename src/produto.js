// Modelo, validações e operações do produto. Não acessa o DOM nem o localStorage.

/**
 * @typedef {Object} Produto
 * @property {string} id
 * @property {string} nome
 * @property {number} preco
 * @property {number} quantidade
 */

const FORMATO_PRECO = /^-?\d+([.,]\d{1,2})?$/;
const FORMATO_QUANTIDADE = /^-?\d+$/;

function validarNome(nome) {
  if (nome.trim() === '') return 'Informe o nome do produto.';
}

function validarPreco(preco) {
  const texto = preco.trim();
  if (texto === '') return 'Informe o preço.';
  if (!FORMATO_PRECO.test(texto)) return 'Digite um preço válido, como 59,90.';
  if (texto.startsWith('-')) return 'O preço não pode ser negativo.';
}

function validarQuantidade(quantidade) {
  const texto = quantidade.trim();
  if (texto === '') return 'Informe a quantidade.';
  if (!FORMATO_QUANTIDADE.test(texto)) return 'Digite um número inteiro, como 3.';
  if (texto.startsWith('-')) return 'A quantidade não pode ser negativa.';
}

// Recebe os textos do formulário e retorna os campos convertidos ou os erros por campo.
export function validarProduto(formulario) {
  const erros = {
    nome: validarNome(formulario.nome),
    preco: validarPreco(formulario.preco),
    quantidade: validarQuantidade(formulario.quantidade),
  };

  if (Object.values(erros).some(Boolean)) return { valido: false, erros };

  return {
    valido: true,
    campos: {
      nome: formulario.nome.trim(),
      preco: Number(formulario.preco.trim().replace(',', '.')),
      quantidade: Number(formulario.quantidade.trim()),
    },
  };
}

// Confere a forma de um valor desconhecido, como o que vem do localStorage.
export function ehProduto(valor) {
  if (typeof valor !== 'object' || valor === null) return false;
  const { id, nome, preco, quantidade } = valor;

  return (
    typeof id === 'string' &&
    id !== '' &&
    typeof nome === 'string' &&
    nome.trim() !== '' &&
    typeof preco === 'number' &&
    Number.isFinite(preco) &&
    preco >= 0 &&
    typeof quantidade === 'number' &&
    Number.isInteger(quantidade) &&
    quantidade >= 0
  );
}

export function criarProduto(campos) {
  return { id: crypto.randomUUID(), ...campos };
}

// Mantém o id: a edição altera o registro existente, sem criar outro.
export function atualizarProduto(lista, id, campos) {
  return lista.map((produto) => (produto.id === id ? { ...produto, ...campos } : produto));
}

export function removerProduto(lista, id) {
  return lista.filter((produto) => produto.id !== id);
}

export function ordenarPorNome(lista) {
  return lista.toSorted((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

// Remove acentos e diferença entre maiúsculas e minúsculas para comparar textos.
function normalizarTexto(texto) {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export function filtrarPorNome(lista, termo) {
  const termoNormalizado = normalizarTexto(termo);
  return lista.filter((produto) => normalizarTexto(produto.nome).includes(termoNormalizado));
}

export function estaIndisponivel(produto) {
  return produto.quantidade === 0;
}
