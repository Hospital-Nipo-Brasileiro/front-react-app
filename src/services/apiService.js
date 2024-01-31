import axios from 'axios';
export const BASE_URL = process.env.BASE_URL || "http://HSRVWVH00028";
export const PORT_ = process.env.PORT_ || "8080";

export class API {
  static async get(path, callback, token) {
    try {
      const response = await axios.get(`${BASE_URL}:${PORT_}${path}`, {
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
      const response = await axios.post(`${BASE_URL}:${PORT_}${path}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      callback(null, response);
    } catch (error) {
      callback(error, null);
    }
  }

  static async login(username, password, callback) {
    const body = {
      ds_username: username,
      ds_password: password
    }
    try {
      const response = await axios.post(`${BASE_URL}:${PORT_}/login`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      callback(null, response);
    } catch (error) {
      callback(error, null);
    }
  }


  static async put(path, body, callback, token) {
    try {
      const response = await axios.put(`${BASE_URL}:${PORT_}${path}`, body, {
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
      const response = await axios.delete(`${BASE_URL}:${PORT_}${path}`, {
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
