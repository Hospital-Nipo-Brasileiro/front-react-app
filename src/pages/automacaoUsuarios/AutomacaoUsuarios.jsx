import React, { useState } from 'react';
import axios from 'axios';

import NavBarUser from '../../components/NavBarUser';
import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton';

import './StyleAutomacaoUsuarios.css'
import HeaderList from '../../components/HeaderList';

function AutomacaoUsuarios() {
  const [arquivoEnviado, setArquivoEnviado] = useState(false);
  const [dia, setDia] = useState('');
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
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
    if (arquivoSelecionado && dia) {      

      const formData = new FormData();
      formData.append('file', arquivoSelecionado);
      formData.append('diaAdmissao', dia); 
      
      axios.post("http://localhost:8080/admissoes/desk",  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log("Usuários criados")
      }).catch((error) => {
        console.error('Erro ao enviar arquivo:', error);
      });
    } else {
      console.error('Nenhum arquivo ou data de admissão selecionados.');
    }

  }

  const criarWord = () => {
    if (arquivoSelecionado && dia) {      

      const formData = new FormData();
      formData.append('file', arquivoSelecionado);
      formData.append('diaAdmissao', dia); 

      axios.post("http://localhost:8080/admissoes/concluir", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log("Usuários criados")
      })
      .catch((error) => {
        console.error('Erro ao enviar arquivo:', error);
      });
    } else {
      console.error('Nenhum arquivo ou data de admissão selecionados.');
    }
  }
  
  return (
    <div className="login-background">
      <span className='title-technipo'>AUTOMAÇÃO</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true} />

        {arquivoEnviado === false ? 
          <div className="w-5/6 h-4/6 mt-16 mb-16 bg-black/30 shadow-xl rounded-3xl flex flex-col justify-between items-center">          
            <div className="container-content-send-user">
              <div className="flex items-center justify-start mt-6">
                <label htmlFor="file-upload" className="px-4 py-2 mb-3 bg-orange-500/50 text-white rounded-xl cursor-pointer">
                  Selecione um arquivo
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {arquivoSelecionado && <p className="ml-4">{arquivoSelecionado.name}</p>}
              </div>
              <Input type='text' placeholder='1404' value={dia} onChange={(e) => setDia(e.target.value)}/>
              <div className='w-full flex justify-center' > 
                <button className='bg-orange-500 w-3/6 h-10 rounded-lg mt-5' onClick={handlePreview}>Pré-visualizar</button>
              </div>
            </div>
          </div> 
          :
          <div className="w-5/6 h-4/6 mt-16 mb-16 bg-black/30 shadow-xl rounded-3xl flex flex-col justify-between items-center">
            <HeaderList />
            <div className="mt-3 w-11/12 h-5/6 overflow-y-auto ">
              {usuarios.map((usuario, index) => (
                <>
                <div className='w-full mb-5 bg-white h-9 flex rounded-3xl items-center justify-center' key={index}>
                  <span className='text-sm w-56 ml-5 truncate'>{usuario?.nome}</span>
                  <span className='text-sm w-28 truncate'>{usuario?.usuario}</span>
                  <span className='text-sm w-32 truncate'>{usuario?.senha}</span>
                  <span className='text-sm w-16 truncate'>{usuario?.local}</span>
                  <span className='text-sm w-64 truncate'>{usuario?.area}</span>
                  <span className='text-sm w-64 truncate'>
                    {usuario?.acessos.map((acesso, index) => (
                      <span key={index}>
                        {acesso}
                        {index !== usuario?.acessos?.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </div>

                {/* <div className='item-bar' key={index}>
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
                </div> */}
                </>
              ))}
            </div>
            
            <div className="container-footer-form">

            <div className="sweet-pagination">
              {/* <SweetPagination
                currentPageData={setCurrentPageData}
                dataPerPage={usersPerPage}
                getData={usuarios.flat()}
                navigation={true}
              /> */}
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