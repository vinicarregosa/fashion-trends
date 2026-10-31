# FashionTrends

Aplicação web simples para pequenos comerciantes de moda organizarem seus produtos, consultarem preços e acompanharem a quantidade disponível.

**Status atual:** MVP implementado — validação com comerciante real pendente.

## O problema

Quem vende roupas e acessórios pelo WhatsApp e pelo Instagram precisa consultar e atualizar dados dos produtos durante o atendimento. Quando essas informações estão espalhadas em anotações, planilhas e conversas, encontrá-las dá trabalho, e o vendedor pode informar um preço errado ou oferecer um produto indisponível.

Essa dificuldade ainda precisa ser validada com comerciantes reais.

## A solução

Uma aplicação que reúne os produtos em um só lugar, com cadastro, listagem, pesquisa por nome, edição, exclusão e indicação de produtos indisponíveis.

Ela roda inteira no navegador, feita com HTML, CSS e JavaScript, sem frameworks e sem backend. Os dados ficam salvos no `localStorage`, portanto só existem no navegador e no dispositivo em que foram cadastrados.

## Como rodar

É preciso ter o [Node.js](https://nodejs.org/) instalado (`^20.19.0` ou `>=22.12.0`).

```bash
npm install
npm run dev
```

O endereço local da aplicação aparece no terminal. Para gerar os arquivos finais, use `npm run build`.

## Documentação

- [Setup](docs/SETUP.md): ferramentas, configuração e estrutura de pastas.
- [Arquitetura](docs/ARQUITETURA.md): separação de responsabilidades, modelo de dados e fluxos.
