# Gestão Financeira

Projeto desenvolvido para a disciplina de Programação para Dispositivos Móveis.

A aplicação consiste em um app de gestão financeira com cadastro de categorias e transações, utilizando um front-end em React Native com Expo e um back-end em Node.js com Express, Prisma e MySQL.

## Funcionalidades

* Listagem de transações;
* Cadastro de novas transações;
* Listagem de categorias;
* Cadastro de categorias padrão via seed;
* Separação entre receitas e despesas;
* Resumo financeiro;
* Integração entre app mobile/web e API;
* Persistência dos dados em banco MySQL.

## Tecnologias utilizadas

### Front-end

* React Native
* Expo
* Expo Router
* Persistência local com AsyncStorage.
* React Navigation
* React Native Picker
* DateTimePicker
* Expo Vector Icons

### Back-end

* Node.js
* Express
* Prisma ORM
* MySQL
* Zod
* CORS
* Dotenv
* Nodemon

## Estrutura do projeto

```bash
praticas/
├── gestao-financeira/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── contexts/
│   ├── services/
│   └── package.json
│
└── gestao-financeira-api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.js
    ├── src/
    │   ├── routes/
    │   │   ├── categories.js
    │   │   └── transactions.js
    │   ├── prisma.js
    │   └── server.js
    └── package.json
```

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/GabrielCM1/PDM26.git
```

Entre na pasta do projeto:

```bash
cd PDM26/praticas
```

## Configuração do back-end

Entre na pasta da API:

```bash
cd gestao-financeira-api
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz da pasta `gestao-financeira-api` com o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/gestao_financeira"
PORT=3000
```

Troque `SUA_SENHA` pela senha configurada no MySQL.

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE gestao_financeira CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Execute as migrations:

```bash
npm run prisma:migrate
```

Execute o seed para cadastrar categorias iniciais:

```bash
npm run prisma:seed
```

Inicie a API:

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

Rotas principais:

```txt
GET    /categories
POST   /categories
PUT    /categories/:id
DELETE /categories/:id

GET    /transactions
POST   /transactions
PUT    /transactions/:id
DELETE /transactions/:id
```

## Configuração do front-end

Em outro terminal, entre na pasta do app:

```bash
cd gestao-financeira
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Para abrir no navegador:

```bash
npm run web
```

Para abrir no Android:

```bash
npm run android
```

Para abrir no iOS:

```bash
npm run ios
```

## Observações

* O back-end precisa estar rodando para que o app consiga carregar categorias e transações.
* O arquivo `.env` não deve ser enviado para o GitHub, pois contém informações sensíveis, como a senha do banco.
* A pasta `node_modules` também não deve ser enviada para o GitHub.
* Caso o app não mostre categorias, execute novamente o seed no back-end:

```bash
npm run prisma:seed
```

## Autor do projeto da disciplina de Programação para Dispositivos Móveis

Gabriel Castagnaro Macêdo 
