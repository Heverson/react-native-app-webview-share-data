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

### 4. Considerações de Segurança: Content Security Policy (CSP)

Para aumentar a segurança das páginas carregadas nas WebViews, foi implementada uma Content Security Policy (CSP) nos arquivos HTML mock (`auth-mock.html` e `checkout-mock.html`). A CSP ajuda a mitigar ataques como Cross-Site Scripting (XSS), controlando os recursos que a WebView tem permissão para carregar.

*   **Implementação na POC:** Nos arquivos HTML mock, a CSP é definida através de uma meta tag:
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
    ```
*   **Significado:**
    *   `default-src 'self'`: Permite que recursos (imagens, fontes, etc.) sejam carregados apenas da mesma origem do documento HTML.
    *   `script-src 'self' 'unsafe-inline'`: Permite scripts da mesma origem e scripts inline (necessário para o funcionamento dos mocks). **Em produção, 'unsafe-inline' deve ser evitado.**
    *   `style-src 'self' 'unsafe-inline'`: Permite estilos da mesma origem e estilos inline (necessário para o funcionamento dos mocks). **Em produção, 'unsafe-inline' deve ser evitado.**

*   **Importância em Produção:** Em um ambiente real, a CSP deve ser configurada de forma mais restritiva, evitando `'unsafe-inline'` e utilizando hashes ou nonces para scripts e estilos inline, ou carregando-os de arquivos externos, para maximizar a proteção contra XSS.