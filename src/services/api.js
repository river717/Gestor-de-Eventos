import axios from 'axios';

const api = 'http://localhost:3000/api';


export const login = async (email, contraseña) => {
  try {
    const response = await axios.post(`${api}/auth/login`, { email, contraseña });
    return response.data; // Información del usuario o mensaje de éxito
  } catch (error) {
    if (error.response) {
      // Respuesta de error del servidor
      throw new Error(error.response.data.error || 'Error al iniciar sesión.');
    } else {
      // Otro tipo de error (conexión, timeout, etc.)
      throw new Error('No se pudo conectar con el servidor.');
    }
  }
};

export const postData = async (data) => {
  try {
    const response = await api.post('/data', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};
