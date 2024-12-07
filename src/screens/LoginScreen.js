import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setUsername] = useState('');
  const [contraseña, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Llama al servicio `login` con las credenciales ingresadas
      const response = await login(email, contraseña);

      // Si las credenciales son válidas, navega a `HomeTabs`
      Alert.alert('Éxito', `Bienvenido ${response.user.nombre}`);
      navigation.replace('HomeTabs');
    } catch (error) {
      // Muestra un mensaje de error
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setUsername}
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

