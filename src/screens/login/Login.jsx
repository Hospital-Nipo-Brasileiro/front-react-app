import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './StylesLogin.css'
import logo from '../../assets/logotype.svg'
import hnipo from '../../assets/hnipo.svg'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const url = 'http://localhost:8080/login';
    const body = {
      ds_username: username,
      ds_password: password
    }

    try {
      const response = await axios.post(url, body);
      const token = response.data;

      console.log(token)

      if (token) {
        navigate('/home');
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
        console.error(error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }

    }
  }

  return (
    <div className="login-background">
      <span className='title-technipo'>LOGIN</span>
      <div className="app-background">
        <ToastContainer />

        <div className="container-logo-login">
          <div className="logotipo-img-txt">
            <img src={logo} alt="logotipo" className='logotipo' />
            <div className="txt-logotipo">
              <span className='txt-logotipo-subtitle'>Beneficiência Nipo Brasileira de São Paulo</span>
              <span className='txt-logotipo-title'>Hospital Nipo-Brasileiro</span>
            </div>
          </div>
        </div>

        <div className="container-card-login">
          <img src={hnipo} alt='' className='hnipo' />
          <div className="align-infos-login">
            <span>username:</span>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>password:</span>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;