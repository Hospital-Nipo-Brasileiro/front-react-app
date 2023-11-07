import React from 'react';
import "./StyleMeuUsuario.css"
import { useEffect } from 'react';
import axios from 'axios';

function MeuUsuario() {
  const BASE_URL = "http://localhost:8080"

  useEffect(() => {
    axios.get(`${BASE_URL}/login`)
  })

  return (
    <div className="login-background">
      <span className='title-technipo'>USUÁRIO</span>
      <div className="app-background" id='app-background-user'>
        <div className="flex flex-col w-3/6 h-5/6 bg-white rounded-xl">
          <span>Gustavo de Souza Fonseca</span>
          <span>Senha: ********</span>
        </div>
      </div>
    </div>
  );
}

export default MeuUsuario;