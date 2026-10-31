FashionTrends
Visão Geral

Aplicação web simples para ajudar pequenos comerciantes do segmento de moda a organizar seus produtos, consultar preços e acompanhar a quantidade disponível.

A proposta é desenvolver uma solução pequena, com baixa complexidade de implementação, que resolva um problema específico e possa ser validada com um usuário real.
Problema

Pequenos comerciantes precisam consultar e atualizar informações dos produtos durante o atendimento aos clientes. Quando os dados estão espalhados por anotações, planilhas e conversas, encontrar informações e manter os preços e as quantidades atualizados pode ser trabalhoso.

Isso pode dificultar o atendimento e levar o vendedor a informar preços incorretos ou oferecer produtos indisponíveis.

    O problema ainda precisa ser validado com comerciantes reais. A existência dessa dificuldade não deve ser presumida para todos os vendedores.

Público-Alvo

Pequenos comerciantes de moda que vendem roupas e acessórios pelo WhatsApp e Instagram.
Objetivo

Facilitar a organização e a consulta das informações dos produtos em um único lugar, reduzindo a necessidade de procurar dados em diferentes fontes.
Solução Proposta

Criar uma aplicação web na qual o comerciante possa cadastrar produtos, consultar o catálogo, pesquisar produtos pelo nome e atualizar preços e quantidades disponíveis.

A aplicação deve priorizar a simplicidade de uso e de implementação. Não pretende substituir um sistema completo de gestão comercial.
Funcionalidades do MVP

    Cadastrar um produto.

    Listar os produtos cadastrados.

    Pesquisar produtos pelo nome.

    Editar as informações de um produto.

    Excluir um produto.

    Validar os dados preenchidos.

    Indicar quando um produto está indisponível por ter quantidade igual a zero.

Dados do Produto
Campo	Descrição
Nome	Identifica o produto.
Preço	Informa o valor de venda.
Quantidade disponível	Registra o número de unidades disponíveis.
ID	Identifica cada registro de forma única e permite localizar o produto durante a edição ou exclusão.

    Os campos apresentados constituem uma proposta inicial. A necessidade de outros campos deverá ser avaliada conforme o problema identificado durante a validação.

Regras de Negócio a Definir

    O nome do produto não pode ficar vazio.

    O preço deve ser válido e não pode ser negativo.

    A quantidade disponível deve ser um número inteiro igual ou superior a zero.

    Cada produto deve possuir um identificador único.

    Um produto com quantidade igual a zero deve ser identificado como indisponível.

    A edição deve atualizar o produto existente, sem criar um novo registro.

    A exclusão deve permitir que o usuário confirme ou cancele a operação.

    Essas regras são a proposta inicial e podem ser ajustadas de acordo com o escopo escolhido.

Tecnologias

    HTML: estrutura da interface.

    CSS: aparência e organização visual.

    JavaScript: implementação da lógica e das regras de negócio.

    Vite: ambiente de desenvolvimento e geração dos arquivos finais.

    localStorage: persistência local dos produtos no navegador.

    Não serão utilizados frameworks como Angular ou React nesta primeira versão. Também não haverá backend, banco de dados remoto ou integração com APIs externas.

Limitações da Primeira Versão

Os dados ficam armazenados no navegador e no dispositivo utilizado. Não existe sincronização automática entre dispositivos ou compartilhamento entre usuários.

Portanto, a primeira versão será uma ferramenta local. Caso a validação indique a necessidade de acesso compartilhado ou utilização em diferentes dispositivos, a persistência poderá ser reavaliada em uma versão futura.
Funcionalidades Fora do Escopo

    Cadastro de clientes.

    Registro e acompanhamento de vendas.

    Controle financeiro.

    Gestão de fornecedores.

    Integração com WhatsApp.

    Integração com Instagram.

    Integração com marketplaces.

    Controle de usuários e permissões.

    Autenticação.

    Banco de dados remoto.

    Backend e APIs.

    Controle de variações de produtos, como tamanhos e cores.

    Essas funcionalidades ficam fora da primeira versão para evitar o aumento desnecessário da complexidade.

Melhorias Futuras

Ideias registradas, sem implementação prevista até a validação com o comerciante:

    Backup do catálogo: exportar e importar os produtos em um arquivo, já que limpar os dados do navegador apaga tudo.

    Ajuste rápido de quantidade: botões + e − na lista, se atualizar o estoque durante o atendimento for frequente.

Validação do Problema

Antes ou durante o desenvolvimento, conversar com pelo menos um pequeno comerciante de moda para entender como ele organiza seus produtos atualmente.
Perguntas para investigar

    Como você registra os produtos que vende?

    Onde consulta os preços durante o atendimento?

    Como controla a quantidade disponível?

    Já informou um preço incorreto por consultar uma informação desatualizada?

    Quanto tempo leva para encontrar determinado produto?

    A ferramenta que você utiliza atualmente atende às suas necessidades?

    O que você gostaria de melhorar nesse processo?

A intenção é descobrir se existe uma dificuldade real e se a aplicação proposta oferece alguma vantagem em relação ao método já utilizado pelo comerciante.
Critério de Sucesso

O projeto deverá permitir que o usuário cadastre, encontre e atualize produtos facilmente, sem depender de anotações espalhadas por diferentes lugares.

A utilidade da aplicação deverá ser avaliada por meio de testes com um usuário real, observando se ela facilita as tarefas propostas.
Objetivos de Aprendizado

    Praticar HTML, CSS e JavaScript.

    Trabalhar com tipos e objetos.

    Manipular formulários e eventos.

    Implementar operações de cadastro, consulta, edição e exclusão.

    Desenvolver validações.

    Manipular listas de dados.

    Utilizar localStorage para persistência.

    Separar a interface da lógica de negócio sem criar uma arquitetura complexa.

    Compreender como transformar um problema em requisitos funcionais e regras de negócio.

    Desenvolver uma solução que possa ser explicada e demonstrada em um portfólio.

Princípio do Projeto

A prioridade é resolver um problema específico com a menor complexidade de implementação possível.

Cada funcionalidade deve ter uma justificativa relacionada ao problema identificado. Recursos que não contribuam diretamente para o objetivo principal deverão ficar fora do MVP.

O projeto não deve ser ampliado apenas para aumentar a quantidade de funcionalidades. A evolução dependerá da validação do problema e das necessidades identificadas durante o uso.