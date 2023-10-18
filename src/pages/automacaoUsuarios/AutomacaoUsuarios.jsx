import React, { useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import './StyleAutomacaoUsuarios.css'
import axios from 'axios';
import SweetPagination from "sweetpagination";
import CustomButton from '../../components/CustomButton';

function AutomacaoUsuarios() {
  const [arquivoEnviado, setArquivoEnviado] = useState(false);
  const [dia, setDia] = useState();
  const [arquivoSelecionado, setArquivoSelecionado] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [usersCreated, setUsersCreated] = useState([]);


  const handleFileChange = (e) => {
    setArquivoSelecionado(e.target.files[0]);
  }

  const handleCreateUsers = () => {
    axios.post("http://localhost:8080/desk-manager/cria-todos-usuarios", arquivoEnviado)
    .then(() => {
      setUsersCreated(usuarios)
      console.log("Usuários criados")
    })
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
          setArquivoEnviado(true)
          setUsuarios(response.data);

        })
        .catch((error) => {
          console.error('Erro ao enviar arquivo:', error);
        });
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  }

  
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
              {currentPageData?.map((usuario, index) => (
                <div className='item-bar' id='item-bar-desk' key={index}>
                  <p className='span-itens2'>{`${usuario?.TUsuario.Nome}`}</p>
                  <p className='span-itens2'>{`${usuario?.TUsuario.Sobrenome}`}</p>
                  <p className='span-itens2'>{`${usuario?.TUsuario.Email}`}</p>
                  <p className='span-itens2'>{`${usuario?.TUsuario.Senha}`}</p>
                  <p className='span-itens2'>{`${usuario?.TUsuario.NomeDepartamento}`}</p>
                </div>
              ))}
            </div>
            
            <div className="container-footer-form">
              <div className="sweet-pagination">
                <SweetPagination
                  currentPageData={setCurrentPageData}
                  dataPerPage={usersPerPage}
                  getData={usuarios}
                  navigation={true}
                  setStyle={'sweetPagination'}
                />

              </div>

              <CustomButton
                text={"Enviar"}
                customStyles={{marginTop : "0px"}}
                onclick={handleCreateUsers}
              />

            </div>

          </div>
        }

        
      </div>
    </div>

    
  )
}



export default AutomacaoUsuarios;