// Leitura e escrita dos produtos no localStorage.
import { ehProduto } from './produto.js';

const CHAVE_PRODUTOS = 'fashion-trends:produtos';

// Dados inválidos ou corrompidos viram lista vazia, sem quebrar a aplicação.
export function carregarProdutos() {
  try {
    const salvo = localStorage.getItem(CHAVE_PRODUTOS);
    if (salvo === null) return [];

    const dados = JSON.parse(salvo);
    return Array.isArray(dados) ? dados.filter(ehProduto) : [];
  } catch {
    return [];
  }
}

// Retorna false se o navegador recusar a gravação (ex.: armazenamento cheio).
export function salvarProdutos(produtos) {
  try {
    localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos));
    return true;
  } catch {
    return false;
  }
}
