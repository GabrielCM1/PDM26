# Gestão Financeira

Aplicativo de gestão financeira desenvolvido para a disciplina de **Programação para Dispositivos Móveis**.

O projeto possui um front-end em **React Native com Expo** e um back-end em **Node.js com Express**, utilizando **Prisma ORM** e **MySQL** para persistência dos dados.

A aplicação permite cadastrar, listar, editar e excluir transações financeiras, além de gerenciar categorias e visualizar um resumo financeiro com filtro por mês e ano.

---

## Funcionalidades

* Login com validação de acesso;
* Mensagem de boas-vindas com o nome do usuário autenticado;
* Listagem de transações;
* Cadastro de novas transações;
* Edição de transações por modal;
* Exclusão de transações;
* Filtro de mês e ano na lista de transações;
* Filtro de mês e ano na tela de resumo;
* Gráfico na aba de resumo;
* Cadastro de categorias customizadas;
* Listagem de categorias;
* Exclusão de categorias customizadas;
* Bloqueio de exclusão de categorias padrão;
* Integração do front-end com API REST;
* Persistência dos dados em banco MySQL;
* Validação de dados no servidor com Zod;
* Collection do Postman com os endpoints da API.

---

## Tecnologias utilizadas

### Front-end

* React Native
* Expo
* Expo Router
* React Navigation
* JavaScript / JSX
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

---

## Estrutura do projeto

```txt
praticas/
├── gestao-financeira/
│   ├── app/
│   │   ├── (tabs)/
│   │   ├── login.jsx
│   │   ├── index.jsx
│   │   └── _layout.jsx
│   ├── components/
│   ├── constants/
│   ├── contexts/
│   ├── services/
│   ├── styles/
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
    ├── postman/
    │   └── collection.json
    ├── .env.example
    └── package.json
```

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/GabrielCM1/PDM26.git
```

Depois entre na pasta do projeto:

```bash
cd PDM26/praticas
```

---

# Back-end

## 1. Entrar na pasta da API

```bash
cd gestao-financeira-api
```

## 2. Instalar as dependências

```bash
npm install
```

## 3. Criar o arquivo `.env`

Crie um arquivo chamado `.env` dentro da pasta `gestao-financeira-api`, usando como base o arquivo `.env.example`.

Exemplo:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/gestao_financeira"
PORT=3000
```

Troque `SUA_SENHA` pela senha configurada no MySQL.

---

## 4. Criar o banco de dados

No MySQL, crie o banco:

```sql
CREATE DATABASE gestao_financeira CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 5. Executar as migrations

```bash
npm run prisma:migrate
```

ou:

```bash
npx prisma migrate dev
```

---

## 6. Executar o seed

O seed cadastra as categorias iniciais da aplicação.

```bash
npm run prisma:seed
```

---

## 7. Rodar a API

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

---

## Rotas da API

### Health-check

```txt
GET /
```

Resposta esperada:

```json
{
  "ok": true,
  "name": "gestao-financeira-api"
}
```

---

### Categorias

```txt
GET /categories
POST /categories
PUT /categories/:id
DELETE /categories/:id
```

Exemplo de criação de categoria:

```json
{
  "name": "health",
  "displayName": "Saúde",
  "icon": "favorite",
  "background": "#FFB6B6",
  "isIncome": false
}
```

Categorias padrão não podem ser excluídas. Caso seja feita uma tentativa de exclusão, a API retorna erro.

---

### Transações

```txt
GET /transactions
POST /transactions
PUT /transactions/:id
DELETE /transactions/:id
```

Exemplo de criação de transação:

```json
{
  "description": "Salário de outubro",
  "value": 3500.50,
  "date": "2026-04-29",
  "categoryId": "ID_DA_CATEGORIA"
}
```

---

## Validação no servidor

A API utiliza **Zod** para validar os dados recebidos.

Caso os dados enviados estejam inválidos, a API retorna erro `400`, seguindo o formato:

```json
{
  "error": "Dados inválidos",
  "details": []
}
```

---

## Postman

A collection do Postman com os endpoints da API está disponível em:

```txt
gestao-financeira-api/postman/collection.json
```

Para testar, importe esse arquivo no Postman e execute as requisições com a API rodando em:

```txt
http://localhost:3000
```

A collection inclui testes para:

* Health-check;
* Listagem de categorias;
* Criação de categoria;
* Atualização de categoria;
* Exclusão de categoria;
* Bloqueio de exclusão de categoria padrão;
* Criação de transação;
* Listagem de transações;
* Exclusão de transação;
* Validação de erro com dados inválidos.

---

# Front-end

## 1. Entrar na pasta do app

Em outro terminal, entre na pasta do front-end:

```bash
cd gestao-financeira
```

Caso esteja na pasta `gestao-financeira-api`, volte uma pasta antes:

```bash
cd ../gestao-financeira
```

---

## 2. Instalar as dependências

```bash
npm install
```

---

## 3. Rodar o app

```bash
npm start
```

ou:

```bash
npx expo start
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

---

## Login de teste

A aplicação possui uma tela de login simples para acesso ao app.

Senha de teste:

```txt
123456
```

O nome informado no login é utilizado para exibir a mensagem de boas-vindas na tela principal.

---

## Observações importantes

* O back-end precisa estar rodando para que o app carregue categorias e transações.
* O banco MySQL precisa estar ativo antes de iniciar a API.
* O arquivo `.env` não deve ser enviado para o GitHub.
* A pasta `node_modules` também não deve ser enviada para o GitHub.
* Caso o app não mostre categorias, execute novamente o seed no back-end:

```bash
npm run prisma:seed
```

---

## Scripts principais da API

```bash
npm run dev
```

Inicia a API em modo desenvolvimento com Nodemon.

```bash
npm run start
```

Inicia a API com Node.

```bash
npm run prisma:migrate
```

Executa as migrations do Prisma.

```bash
npm run prisma:seed
```

Executa o seed de categorias iniciais.

```bash
npm run prisma:studio
```

Abre o Prisma Studio para visualizar os dados do banco.

---

## Autor

Projeto desenvolvido por **Gabriel Macêdo** para a disciplina de **Programação para Dispositivos Móveis**.
