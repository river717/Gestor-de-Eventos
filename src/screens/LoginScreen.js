import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    // Validación simulada
    setTimeout(() => {
      if (email === 'admin' && contraseña === 'admin123') {
        Alert.alert('Éxito', 'Bienvenido admin');
        navigation.replace('HomeTabs');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 1000); // Simula un tiempo de respuesta
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contraseña}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
  },
});

export default LoginScreen;

