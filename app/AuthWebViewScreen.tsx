import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function AuthWebViewScreen() {
  const router = useRouter();

  const handleWebViewMessage = useCallback(async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'AUTH_SUCCESS' && data.token) {
        await SecureStore.setItemAsync('user_token', data.token);
        console.log('Token armazenado com sucesso:', data.token);
        router.replace('/'); // Navega de volta para a tela inicial (ProductScreen)
      }
    } catch (error) {
      console.error('Erro ao processar mensagem do WebView:', error);
    }
  }, [router]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Autenticação' }} />
      <WebView
        source={require('../assets/html/auth-mock.html')}
        onMessage={handleWebViewMessage}
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
