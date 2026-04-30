export default class APIError extends Error {
  constructor(message, response) {
    super(message);

    this.name = 'APIError';
    this.response = response;
    this.status = response?.status;
    this.data = response?.data;
  }
}
