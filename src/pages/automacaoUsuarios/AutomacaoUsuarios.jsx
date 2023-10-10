import React, { useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import './StyleAutomacaoUsuarios.css'
import axios from 'axios';

function AutomacaoUsuarios() {
  const [dia, setDia] = useState();
  const [arquivoSelecionado, setArquivoSelecionado] = useState();

  const handleFileChange = (e) => {
    setArquivoSelecionado(e.target.files[0]);
  }

  const handlePreview = () => {
    if (arquivoSelecionado) {
      const formData = new FormData();
      formData.append('file', arquivoSelecionado);

      axios
        .post('http://localhost:8080/desk-manager/visualiza', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Lide com a resposta da API conforme necessário
          console.log('Resposta da API:', response.data);
        })
        .catch((error) => {
          // Lide com erros da solicitação
          console.error('Erro ao enviar arquivo:', error);
        });
    } else {
      // Exiba uma mensagem de erro se nenhum arquivo estiver selecionado
      console.error('Nenhum arquivo selecionado.');
    }
  }
  
  return (
    <div className="login-background">
      <span className='title-technipo'>AUTOMAÇÃO</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true} />

        <div className="form-send-user">
          <div className="particle-js">            
          </div>
          <div className="container-content-send-user">
            <input type="file" onChange={handleFileChange}/>
            <input type="text" placeholder='1404' value={dia} onChange = {(e) => setDia(e.target.value)}/>
            <button onClick={handlePreview}>Pré-visualizar</button>
          </div>
        </div>
        
      </div>
    </div>

    
  )
}



export default AutomacaoUsuarios;