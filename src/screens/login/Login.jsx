import React, { useState } from 'react';
import styles from './StylesLogin.css'
import logo from '../../assets/logotype.svg'

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if(username === "gustavo.fonseca" && password === "123456") {
      console.log("Login bem sucedido!")
    } else {
      console.error("Usuario e/ou senha incorreto")
    }
  }

  return (
    <div className="login-background">
        <span className='title-technipo'>LOGIN</span>
        <div className="app-background">

          <div className="container-logo-login">
            <div className="logotipo-img-txt">
            <img src={logo} alt="logotipo" className='logotipo'/>
            <div className="txt-logotipo">
              <span className='txt-logotipo-subtitle'>Beneficiência Nipo Brasileira de São Paulo</span>
              <span className='txt-logotipo-title'>Hospital Nipo-Brasileiro</span>
            </div>
            </div>
          </div>

          <div className="container-card-login">
            <img src=''/>
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