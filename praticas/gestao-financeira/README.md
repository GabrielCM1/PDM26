# Gestão Financeira

Aplicativo mobile criado com Expo Router e React Native para registrar transações, persistir dados localmente e acompanhar o resumo financeiro por categoria.

## Funcionalidades

- Cadastro de transações com descrição, valor, data e categoria.
- Máscara de moeda em reais.
- Date picker nativo.
- Categorias com ícones e cores.
- Persistência local com AsyncStorage.
- Listagem de transações.
- Resumo por categoria e saldo geral.
- Configuração EAS para gerar APK de preview.

## Rodando o Projeto

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Também é possível abrir diretamente no Android:

```bash
npm run android
```

## Build Instalável

O arquivo `eas.json` já tem um perfil `preview` configurado para Android com saída em APK. Para vincular o projeto à sua conta Expo e gerar um build:

```bash
npm install -g eas-cli
eas login
eas init
eas build -p android --profile preview
```

O comando `eas init` preenche o `extra.eas.projectId` no `app.json`. Esse valor não deve ser copiado de outro projeto.

## Conclusão e Próximos Passos (Projeto 10)

Depois desta base, o que mais acelera e consolida o aprendizado e fazer projetos com a sua cara e estudar sob demanda conforme o app pede.

Sugestoes de evolucao para este app:

- Filtros por periodo ou categoria.
- Edicao e exclusao de transacoes.
- Graficos de despesas e receitas.
- Login e sincronizacao com backend.
- Armazenamento com SQLite.
- Testes com Jest e React Native Testing Library.
- Publicacao em loja com EAS Submit.

O que estudar a seguir (roadmap):

- Estilizacao avancada (ex.: styled-components, NativeWind).
- Networking (fetch/axios) e integracao com APIs.
- Recursos nativos (deep linking, animacoes, mapas, notificacoes).

## Links Uteis

- Roadmap React Native: https://roadmap.sh/react-native
- Tutorial Expo (galeria/camera): https://docs.expo.dev/tutorial/introduction/
- Expo Docs: https://docs.expo.dev
- React Native Docs: https://reactnative.dev/docs/components-and-apis
- EAS Build: https://docs.expo.dev/build/introduction/
