# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Fluxo de Autenticação e Checkout com WebView (POC)

Este projeto demonstra uma Prova de Conceito (POC) de como integrar fluxos de autenticação e checkout baseados em WebView em um aplicativo React Native com Expo, mantendo a sessão do usuário entre o aplicativo e as páginas web.

### 1. Autenticação na WebView

*   **Início do Fluxo:** A navegação para a tela de "Adicionar Produto" (`AddProductScreen`) verifica a existência de um token de autenticação. Se o token não estiver presente, o usuário é redirecionado para a `AuthWebViewScreen`.
*   **Carga da WebView:** A `AuthWebViewScreen` carrega uma página HTML local (`assets/html/auth-mock.html`) que simula uma tela de login de um backend PHP. Esta página contém um formulário de login.
*   **Envio do Token:** Ao submeter o formulário na `auth-mock.html`, um JavaScript dentro da página gera um token de autenticação simulado e o envia para o aplicativo React Native usando `window.ReactNativeWebView.postMessage()`.
*   **Captura e Armazenamento no App:** O `AuthWebViewScreen` ouve as mensagens da WebView através da propriedade `onMessage`. Ao receber o token, ele é armazenado de forma segura no dispositivo usando `expo-secure-store`. Após o armazenamento, o usuário é redirecionado de volta para a tela de produtos.

### 2. Fluxo de Checkout com Sessão Persistente

*   **Redirecionamento para Checkout:** Na `AddProductScreen`, após a autenticação, um botão "Ir para Checkout" é exibido. Clicar nele leva o usuário para a `CheckoutWebViewScreen`.
*   **Recuperação e Injeção de Token:** A `CheckoutWebViewScreen` recupera o token de autenticação armazenado no `expo-secure-store`. Este token é então injetado no `localStorage` da WebView *antes* do conteúdo HTML ser carregado, usando a propriedade `injectedJavaScriptBeforeContentLoaded`.
*   **Validação da Sessão na WebView:** A página HTML de checkout (`assets/html/checkout-mock.html`) verifica a presença deste token no seu `localStorage` ao carregar. Isso simula a persistência da sessão, onde um backend PHP real poderia ler este token (ou um cookie correspondente) para validar a autenticação do usuário.

### 3. Gerenciamento de Status de Autenticação

*   **`ProductScreen`:** Exibe o status atual de autenticação (Autenticado/Não Autenticado) e oferece um botão de "Logout" que remove o token do `expo-secure-store`, resetando o status.
*   **`AddProductScreen`:** Atua como um gatekeeper, garantindo que apenas usuários autenticados possam prosseguir para a funcionalidade de adicionar produtos e, consequentemente, para o checkout.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
