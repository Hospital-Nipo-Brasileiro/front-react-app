import { toast } from 'react-toastify';
import { API } from '../services/apiService';
import { toastConfig } from '../services/toastConfigService';

export const signIn = async ({ username, password }) => {
  try {
    await API.login(username, password, (err, data) => {
      if (err) {
        toast.error(err.mensagem, toastConfig)
      } else {
        sessionStorage.setItem('token', data.data.token);
        sessionStorage.setItem('userId', data.data.userId);
        return true;
      }
    })
  } catch (error) {
    toast.error(error.response.data, toastConfig);
  }
};