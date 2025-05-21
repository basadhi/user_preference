import { apiService } from './apiService.js';

export async function authenticateUser(email, password) {
  try {
    const response = await apiService.post('/api/auth/login/', {
      email,
      password
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      return response.user;
    }
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    if (error.response && error.response.status === 401) {
      return 'invalid_password';
    }
    throw error;
  }
} 