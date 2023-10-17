import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './StylesLogin.css'
import logo from '../../assets/logotype.svg'
import hnipo from '../../assets/hnipo.svg'
import { useAuth } from '../../contexts/AuthContext';
import { signIn } from '../../hooks/signIn';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, login } = useAuth();


  useEffect(() => {
    if (auth) {
      navigate('/home');
    }
  })

  const handleSignIn = async () => {
    try {
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
      const token = await signIn({username, password});
      if(token) {
        login();
        navigate("/home");
      } 
      
    } catch (error) {
      toast.error("Falha ao fazer login. Verifique suas credenciais.");
    }
  };


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
          <div className="container-content-login-without-copyright">
            <img src={hnipo} alt='' className='hnipo' />
            <div className="align-infos-login">
              <div className="container-input">
                <label className='label-input'>username:</label>
                <div className='container-input-without-label'>
                  <input
                    type='text'
                    className='inputs'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="container-input">
                <label className='label-input'>password:</label>
                <input
                  type='password'
                  className='inputs'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className='btn-login' id='login-screen-login' onClick={handleSignIn}>login</button>
            </div>
          </div>
          <span className='copyright-span'>All rights reseved by TechNipo©2023. Created by Gustavo Fonseca</span>
        </div>
      </div>
    </div>
  );
}

export default Login;