import React, { useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import './StyleAutomacaoUsuarios.css'
import axios from 'axios';

function AutomacaoUsuarios() {
  const [arquivoEnviado, setArquivoEnviado] = useState(false);
  const [dia, setDia] = useState();
  const [arquivoSelecionado, setArquivoSelecionado] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;


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
          console.log('Resposta da API:', response.data);
          setArquivoEnviado(true)
          setUsuarios(response.data);

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

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };
  
  const prevPage = () => {
    setCurrentPage(prev => prev - 1);
  };
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

  
  return (
    <div className="login-background">
      <span className='title-technipo'>AUTOMAÇÃO</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true} />

        {arquivoEnviado === false ? 
          <div className="form-send-user">
            <div className="particle-js"/>            
            <div className="container-content-send-user">
              <input type="file" onChange={handleFileChange}/>
              <input type="text" placeholder='1404' value={dia} onChange={(e) => setDia(e.target.value)}/>
              <button onClick={handlePreview}>Pré-visualizar</button>
            </div>
          </div> 
          :
          <div className="form-send-user">
            <div className="particle-js"/>
            
            <div className="deskmanager-users-preview">
              <div className='item-bar' id='item-bar-desk'>
                <p className='span-itens3'>Nome</p>
                <p className='span-itens3'>Sobrenome</p>
                <p className='span-itens3'>Email</p>
                <p className='span-itens3'>Senha</p>
                <p className='span-itens3'>Departamento</p>
              </div>
              {currentUsers.map((usuario, index) => (
                <div className='item-bar' id='item-bar-desk' key={index}>
                  <p className='span-itens2'>{`${usuario.TUsuario.Nome}`}</p>
                  <p className='span-itens2'>{`${usuario.TUsuario.Sobrenome}`}</p>
                  <p className='span-itens2'>{`${usuario.TUsuario.Email}`}</p>
                  <p className='span-itens2'>{`${usuario.TUsuario.Senha}`}</p>
                  <p className='span-itens2'>{`${usuario.TUsuario.NomeDepartamento}`}</p>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
              <button onClick={nextPage} disabled={currentUsers.length < usersPerPage}>Próxima</button>
            </div>    

          </div>
        }

        
      </div>
    </div>

    
  )
}



export default AutomacaoUsuarios;