import axios from "axios";
const BASE_URL = process.env.BASE_URL || "http://localhost";

export class Service {
  
  static async get(path, callback) {
    console.log(`${BASE_URL}:8080${path}`)
    try {
      const response = await axios.get(`${BASE_URL}:8080${path}`);
      callback(null, response.data);
    } catch (error) {
      callback(error.data, null);
    }
  }
}