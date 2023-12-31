import axios from 'axios';
import { toast } from 'react-toastify';

export const signIn = async ({ username, password }) => {
  const url = "http://HSRVWVP00030:8080/login";
  const body = {
    ds_username: username,
    ds_password: password,
  };

  try {
    const response = await axios.post(url, body);
    const token = response.data.token;
    const userId = response.data.userId;
    if (token) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
      return token;
    } else {
      toast.error(`Falha no login. Verifique suas credenciais.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  } catch (error) {
    if (error instanceof Error && error.message) {
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(`${error.response.data}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
};