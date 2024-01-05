import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'http://hsrvwvh00028';

export class Service {
  
  static async get(path, callback, token) {
    try {
      const response = await axios.get(`${BASE_URL}:8080${path}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      callback(null, response.data);
    } catch (error) {
      callback(error.data, null);
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
      callback(null, response.data);
    } catch (error) {
      callback(error.data, null);
    }
  }
}