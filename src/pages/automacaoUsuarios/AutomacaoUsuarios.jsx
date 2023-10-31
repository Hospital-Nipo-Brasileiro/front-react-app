import React, { useState } from 'react';
import axios from 'axios';

import NavBarUser from '../../components/NavBarUser';
import SweetPagination from "sweetpagination";
import CustomButton from '../../components/CustomButton';

import './StyleAutomacaoUsuarios.css'

function AutomacaoUsuarios() {
  const [arquivoEnviado, setArquivoEnviado] = useState(false);
  const [dia, setDia] = useState();
  const [arquivoSelecionado, setArquivoSelecionado] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  const usersPerPage = 5;


  const handleFileChange = (e) => {
    setArquivoSelecionado(e.target.files[0]);
  }

  const handlePreview = () => {
    if (arquivoSelecionado && dia) {
      

      const formData = new FormData();
      formData.append('file', arquivoSelecionado);
      formData.append('diaAdmissao', dia); 
  
      axios
        .post('http://localhost:8080/admissoes/enviar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setArquivoEnviado(true);
          setUsuarios(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Erro ao enviar arquivo:', error);
        });
    } else {
      console.error('Nenhum arquivo ou data de admissão selecionados.');
    }
  };
  

  const criarDeskManager = () => {
    axios.post("http://localhost:8080/admissoes/desk", arquivoEnviado)
    .then(() => {
      console.log("Usuários criados")
    })
  }

  const criarWord = () => {
    axios.post("http://localhost:8080/admissoes/concluir", arquivoEnviado)
    .then(() => {
      console.log("Usuários criados")
    })
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
            <div className="deskmanager-users-preview">
              <div className='item-bar'>
                <p className='span-itens3' id='span-item-nome'>Nome</p>
                <p className='span-itens3' id='span-item-usuario'>Usuário</p>
                <p className='span-itens3' id='span-item-senha'>Senha</p>
                <p className='span-itens3' id='span-item-local'>Local</p>
                <p className='span-itens3' id='span-item-departamento'>Departamento</p>
                <p className='span-itens3' id='span-item-acessos'>Acessos</p>
              </div>
              {currentPageData.map((usuario, index) => (
                <div className='item-bar' key={index}>
                  <p className='span-itens2' id='span-item-nome'>{usuario?.nome}</p>
                  <p className='span-itens2' id='span-item-usuario'>{usuario?.usuario}</p>
                  <p className='span-itens2' id='span-item-senha'>{usuario?.senha}</p>
                  <p className='span-itens2' id='span-item-local'>{usuario?.local}</p>
                  <p className='span-itens2' id='span-item-departamento'>{usuario?.area}</p>
                  <p className='span-itens2' id='span-item-acessos'>
                    {usuario?.acessos.map((acesso, index) => (
                    <span key={index}>
                      {acesso}
                      {index !== usuario?.acessos?.length - 1 && ', '}
                    </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="container-footer-form">

            <div className="sweet-pagination">
              <SweetPagination
                currentPageData={setCurrentPageData}
                dataPerPage={usersPerPage}
                getData={usuarios.flat()}
                navigation={true}
              />
            </div>

            <CustomButton
              text={"Criar Desk"}
              customStyles={{marginTop : "0px"}}
              onclick={criarDeskManager}
            />

            <CustomButton
              text={"Criar Word"}
              customStyles={{marginTop : "0px"}}
              onclick={criarWord}
            />

            </div>

          </div>
        }

        
      </div>
    </div>

    
  )
}



export default AutomacaoUsuarios;