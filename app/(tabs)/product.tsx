import { Stack, useFocusEffect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProductScreen() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthenticationStatus = useCallback(async () => {
    const token = await SecureStore.getItemAsync('user_token');
    setIsAuthenticated(!!token);
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkAuthenticationStatus();
    }, [checkAuthenticationStatus])
  );

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('user_token');
    setIsAuthenticated(false);
    console.log('Usuário deslogado.');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Tela de Produtos' }} />
      <Text style={styles.title}>Tela de Produtos</Text>
      <Text style={styles.authStatus}>
        Status: {isAuthenticated ? 'Autenticado' : 'Não Autenticado'}
      </Text>
      <Button
        title="Adicionar Produto"
        onPress={() => router.push('/add-product')}
      />
      {isAuthenticated && (
        <Button
          title="Logout"
          onPress={handleLogout}
          color="red"
        />
      )}
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
  authStatus: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
});
