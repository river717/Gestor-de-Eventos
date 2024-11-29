import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import HistorialScreen from '../screens/HistorialScreen';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = ({ navigation }) => {
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Redirigir al Login al hacer clic en "Cerrar sesión"
    navigation.replace('Login');
  };

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Gestión de Eventos" 
        component={HomeScreen} 
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ color: 'red', marginRight: 10 }}>Cerrar sesión</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen 
        name="Historial de Eventos" 
        component={HistorialScreen} 
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ color: 'red', marginRight: 10 }}>Cerrar sesión</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;

