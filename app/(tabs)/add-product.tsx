import { Stack, useFocusEffect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AddProductScreen() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuthentication = useCallback(async () => {
    const token = await SecureStore.getItemAsync('user_token');
    setIsAuthenticated(!!token);
    if (!token) {
      router.replace('/AuthWebViewScreen');
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      checkAuthentication();
    }, [checkAuthentication])
  );

  if (isAuthenticated === null) {
    return (
      <View style={styles.container}>
        <Text>Verificando autenticação...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>Você precisa estar autenticado para adicionar produtos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Adicionar Produto' }} />
      <Text style={styles.title}>Tela de Adicionar Produto</Text>
      <Button
        title="Ir para Checkout"
        onPress={() => router.push('/CheckoutWebViewScreen')}
      />
      <Button
        title="Voltar para Produtos"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
