import React, { useState } from 'react';
import "./StyleMeuUsuario.css"
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function MeuUsuario() {
  const [usuario, setUsuario] = useState("");

  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  const BASE_URL = "http://localhost:8080"
  
  useEffect(() => {
    console.log(userId);

    axios.get(`${BASE_URL}/login/${userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      }
    })
      .then(response => {
        setUsuario(response.data.ds_username);
      })
      .catch((error) => {
        toast.error(`Erro ao enviar arquivos: ${error}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
  }, [])

 

  return (
    <div className="login-background">
      <span className='title-technipo'>USUÁRIO</span>
      <div className="app-background" id='app-background-user'>
        <div className="flex flex-col w-3/6 h-5/6 bg-white rounded-xl">
          <label className='text-orange-500'>Usuário: </label>
          <span className='bg-stone-200'>{usuario}</span>
          <span>Senha: ********</span>
        </div>
      </div>
    </div>
  );
}

export default MeuUsuario;