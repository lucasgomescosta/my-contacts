import apiClient from '../utils/api';

export class AuthService {
  static async signUp({ name, email, password }) {
    const { data } = await apiClient.post('/auth/signup', {
      name,
      email,
      password,
    });

    return data;
  }

  static async signIn({ email, password }) {
    const { data } = await apiClient.post('/auth/signin', {
      email,
      password,
    });

    return data;
  }

  static async refreshToken(refreshToken) {
    const { data } = await apiClient.post('/refresh-token', {
      refreshToken,
    });

    return data;
  }
}
