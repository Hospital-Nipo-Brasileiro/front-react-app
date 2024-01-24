import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'http://localhost';

export class API {

  static async get(path, callback, token) {
    try {
      const response = await axios.get(`${BASE_URL}:8080${path}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      callback(null, response);
    } catch (error) {
      callback(error.response.data, null);
    }
  }

  static async post(path, body, callback, token) {
    try {
      const response = await axios.post(`${BASE_URL}:8080${path}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      console.log(response);
      callback(null, response);
    } catch (error) {
      console.log(error)
      callback(error, null);
    }
  }

  static async put(path, body, callback, token) {
    try {
      const response = await axios.put(`${BASE_URL}:8080${path}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      callback(null, response);
    } catch (error) {
      callback(error.response.data, null);
    }
  }

  static async delete(path, callback, token) {
    try {
      const response = await axios.delete(`${BASE_URL}:8080${path}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      callback(null, response.data);
    } catch (error) {
      callback(error.response.data, null);
    }
  }
}