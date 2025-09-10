import { Stack, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CheckoutWebViewScreen() {
  const [injectedJavaScriptBeforeContentLoaded, setInjectedJavaScriptBeforeContentLoaded] = useState('');

  const getTokenAndInject = useCallback(async () => {
    const token = await SecureStore.getItemAsync('user_token');
    if (token) {
      // Injeta o token no localStorage do WebView antes do conteúdo ser carregado.
      setInjectedJavaScriptBeforeContentLoaded(`
        localStorage.setItem('user_token', '${token}');
        true; // Necessário para que o script seja executado uma única vez
      `);
      console.log('Token injetado no WebView para checkout ANTES do carregamento do conteúdo.');
    } else {
      console.warn('Nenhum token encontrado para injetar no WebView de checkout.');
      setInjectedJavaScriptBeforeContentLoaded('true;'); // Garante que algo é injetado, mesmo que vazio
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTokenAndInject();
    }, [getTokenAndInject])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Checkout' }} />
      <WebView
        source={require('../assets/html/checkout-mock.html')}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoaded}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
