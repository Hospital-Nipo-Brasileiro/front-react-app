import axios from 'axios';
import { toast } from 'react-toastify';

export const signIn = async ({ username, password }) => {
  const url = "http://localhost:8080/login";
  const body = {
    ds_username: username,
    ds_password: password,
  };

  if (!username || username === undefined) {
    toast.error(`Nenhum usuário inserido`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  } else if (!password || password === undefined) {
    toast.error(`Senha não inserida`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  }

  try {
    const response = await axios.post(url, body);
    const token = response.data;

    if (token) {
      sessionStorage.setItem("token", response.data.token);
      return token
    } else {
      toast.error(`${response.data}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
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
        pauseOnHover: true,
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
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
};