import React from 'react';
import "./StyleMeuUsuario.css"

function MeuUsuario() {
  return (
    <div className="login-background">
      <span className='title-technipo'>USER</span>
      <div className="app-background" id='app-background-user'>
        <div className="form-user-settings">
          <span>Gustavo de Souza Fonseca</span>
          <span>Senha: ********</span>
        </div>
      </div>
    </div>
  );
}

export default MeuUsuario;