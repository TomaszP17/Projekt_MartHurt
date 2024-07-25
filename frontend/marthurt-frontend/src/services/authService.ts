import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080/api/auth/';

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL + 'login', {
    username,
    password,
  });

  if (response.data.token) {
    Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
  }
  return response.data;
};

export const logout = () => {
  Cookies.remove('token');
};

export const getCurrentUser = async () => {
  const token = Cookies.get('token');
  if (token) {
    const response = await axios.get(API_URL + 'me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  return null;
};
