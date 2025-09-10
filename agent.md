# Agente de Desenvolvimento React Native com Expo

## Introdução
Este agente tem como objetivo auxiliar no desenvolvimento de aplicações React Native utilizando o framework Expo. Ele fornecerá diretrizes, exemplos e melhores práticas para a criação de telas, funções e testes, agilizando o processo de desenvolvimento e garantindo a qualidade do código.

## Criação de Telas
### Estrutura de Componentes
Componentes funcionais são preferidos com Hooks. Recomendo usar um padrão de pasta para cada tela que contenha o componente principal da tela, seus subcomponentes, e lógica relacionada (ex: `screens/HomeScreen/index.tsx`, `screens/HomeScreen/components/Header.tsx`, `screens/HomeScreen/hooks/useHomeData.ts`).

### Navegação
O `expo-router` é a solução de navegação recomendada para projetos Expo, pois oferece roteamento baseado em arquivos, o que simplifica a configuração. Para casos mais complexos, o `React Navigation` é uma alternativa poderosa e flexível.

### Estilização
`StyleSheet` do React Native é fundamental para estilos básicos. Para estilos mais avançados e responsivos, `react-native-reanimated` e `react-native-gesture-handler` podem ser usados. Para estilos de design system, `Nativewind` (uma implementação do Tailwind CSS para React Native) ou bibliotecas de componentes UI como `React Native Paper` ou `Tamagui` podem ser úteis.

### Gerenciamento de Estado
Para estados simples e locais, `useState` e `useReducer` são suficientes. Para estados globais, o `Context API` do React é uma boa escolha. Para aplicações maiores e mais complexas, bibliotecas como `Zustand` (leve e flexível) ou `Redux` (com `Redux Toolkit` para simplificar) podem ser consideradas.

## Criação de Funções/Lógica
### Funções Utilitárias
Crie funções puras e reutilizáveis em arquivos `utils.ts` ou pastas `utils/` para lógica de formatação, validação, etc.

### Chamadas de API
Utilize `axios` ou a API `fetch` nativa. Considere envolver as chamadas em custom hooks (ex: `useFetchData`) para gerenciar estados de loading, erro e cache.

### Hooks Personalizados
Encapsule lógicas complexas e estados reutilizáveis em custom hooks (ex: `useAuth`, `useCart`) para manter os componentes limpos e focados na UI.

### Manipulação de Dados
Use `immer` para facilitar a manipulação de estados imutáveis, especialmente com `useReducer` ou Redux. Para operações complexas em listas, use métodos nativos do JavaScript (`map`, `filter`, `reduce`).

## Criação de Testes
### Estruturas de Teste Recomendadas
`Jest` é o framework de teste padrão para projetos React Native e Expo. Para testes de componentes e interação do usuário, a `React Native Testing Library` é altamente recomendada por focar na forma como o usuário interage com a UI.

### Testes de Unidade
Escreva testes de unidade para funções puras e hooks personalizados para garantir que a lógica individual funcione corretamente. Use `Jest` para isso.

### Testes de Componentes
Utilize a `React Native Testing Library` para testar componentes isoladamente, simulando interações do usuário e verificando a renderização correta e o comportamento esperado.

### Mocks e Simulações
Use as funcionalidades de mocking do `Jest` para simular módulos, funções e chamadas de API externas, garantindo que os testes sejam rápidos e isolados.

## Considerações sobre Expo
### Uso de `expo-router`
O `expo-router` simplifica a navegação com base em arquivos, similar ao Next.js. É a forma preferencial de gerenciar rotas em projetos Expo, oferecendo rotas dinâmicas, layouts aninhados e integração profunda com o Expo SDK.

### Módulos Expo e SDK
Aproveite os módulos nativos do Expo (SDK) para funcionalidades como câmera, geolocalização, notificações, etc. Sempre consulte a documentação oficial do Expo para a implementação correta e as permissões necessárias.

### Desenvolvimento com `expo-dev-client`
Para testar recursos nativos e módulos personalizados que não são suportados pelo aplicativo Expo Go, utilize o `expo-dev-client`. Ele permite construir um aplicativo de desenvolvimento personalizado para depurar e testar seu projeto.

## Boas Práticas
### Organização de Pastas
Mantenha uma estrutura de pastas consistente e lógica. Uma sugestão é: `src/` (para o código-fonte), com subpastas para `components/`, `screens/`, `hooks/`, `utils/`, `services/`, `assets/`, `constants/`.

### Reusabilidade de Código
Crie componentes, hooks e funções utilitárias que possam ser reutilizados em diferentes partes da aplicação para evitar duplicação de código e facilitar a manutenção.

### Performance
Otimize a performance da sua aplicação usando `React.memo`, `useCallback`, `useMemo` para evitar renderizações desnecessárias. Cuidado com o uso excessivo de efeitos e garanti a limpeza de listeners.

### Acessibilidade
Desenvolva com acessibilidade em mente. Utilize as propriedades de acessibilidade do React Native (ex: `accessibilityLabel`, `accessible`, `role`) e teste sua aplicação com leitores de tela e outras ferramentas de acessibilidade.