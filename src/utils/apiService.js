import apiClient from './api.js';
import APIError from '../errors/APIError';

const handleError = (error) => {
  if (error.response) {
    const message =
      error.response.data?.error ||
      error.response.data?.message ||
      `${error.response.status} - ${error.response.statusText}`;

    throw new Error(message);
  }

  // requisição cancelada (AbortController.abort())
  if (error.name === 'AbortError' || error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
    throw error;
  }

  // erro de rede
  throw new APIError('Erro de conexão com o servidor', error);
};

// GET
export const get = async (url, params = {}, config = {}) => {
  try {
    const response = await apiClient.get(url, {
      params,
      ...config
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// POST
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PUT
export const put = async (url, data = {}, config = {}) => {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE
export const remove = async (url, config = {}) => {
  try {
    const response = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
