# Gestao Financeira

Aplicativo mobile de gestao financeira desenvolvido com React Native, Expo e Expo Router. O projeto organiza a base de um app chamado Money, com navegacao por abas, telas principais para controle financeiro e uma identidade visual centralizada por constantes de cor.

## Sobre o projeto

O app foi criado como parte das praticas da disciplina de Programacao para Dispositivos Moveis. Nesta etapa, ele implementa a estrutura inicial da aplicacao:

- tela de transacoes;
- tela para adicionar transacoes;
- tela de resumo financeiro;
- navegacao inferior com tres abas;
- botao central destacado para cadastro de nova transacao;
- cabecalho e status bar personalizados com a cor principal do app.

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- React Navigation
- JavaScript
- TypeScript, usado na configuracao e em hooks gerados pelo template
- ESLint

## Estrutura principal

```text
praticas/gestao-financeira/
|-- app/
|   |-- _layout.jsx
|   |-- +not-found.jsx
|   `-- (tabs)/
|       |-- _layout.jsx
|       |-- index.jsx
|       |-- add-transactions.jsx
|       `-- summary.jsx
|-- constants/
|   `-- colors.js
|-- hooks/
|-- scripts/
|-- app.json
|-- package.json
`-- README.md
```

## Telas

### Transacoes

Arquivo: `app/(tabs)/index.jsx`

Tela inicial do aplicativo, reservada para a listagem das movimentacoes financeiras.

### Adicionar Transacao

Arquivo: `app/(tabs)/add-transactions.jsx`

Tela de cadastro de uma nova transacao. Ela e acessada pela aba central, representada por um botao circular com icone de adicionar.

### Resumo

Arquivo: `app/(tabs)/summary.jsx`

Tela destinada a exibicao de um resumo financeiro, como saldos, categorias ou indicadores do usuario.

## Navegacao

A navegacao e configurada com Expo Router em `app/(tabs)/_layout.jsx`.

As abas disponiveis sao:

- `index`: Transacoes
- `add-transactions`: Adicionar Transacao
- `summary`: Resumo

O layout principal fica em `app/_layout.jsx` e registra o grupo `(tabs)` dentro de uma `Stack`, mantendo o cabecalho das abas sob controle do proprio `TabsLayout`.

## Identidade visual

As cores do projeto ficam centralizadas em `constants/colors.js`, facilitando ajustes de tema e padronizacao visual.

Cores principais:

- `primary`: verde principal do app;
- `primaryContrast`: branco para contraste;
- `inactive`: cinza usado em abas inativas;
- `background`: cor de fundo;
- cores de categorias para renda, alimentacao, casa, educacao e viagem;
- cores de texto positivo e negativo.

## Como executar

### Pre-requisitos

Antes de iniciar, tenha instalado:

- Node.js em versao LTS;
- npm;
- Expo Go no celular, caso queira testar em dispositivo fisico.

### Passos

Entre na pasta do projeto:

```bash
cd praticas/gestao-financeira
```

Instale as dependencias:

```bash
npm install
```

Inicie o Expo:

```bash
npm start
```

Depois, escolha uma das opcoes exibidas no terminal:

- abrir no Android;
- abrir no iOS;
- abrir no navegador;
- escanear o QR Code com o Expo Go.

## Scripts disponiveis

```bash
npm start
```

Inicia o servidor de desenvolvimento do Expo.

```bash
npm run android
```

Inicia o app no Android.

```bash
npm run ios
```

Inicia o app no iOS.

```bash
npm run web
```

Inicia a versao web.

```bash
npm run lint
```

Executa a verificacao de lint do projeto.

## Status

Projeto em fase inicial, com foco na configuracao da navegacao, criacao das telas base e organizacao visual. As proximas etapas naturais sao implementar o formulario de transacao, armazenar os dados e exibir o resumo financeiro.
