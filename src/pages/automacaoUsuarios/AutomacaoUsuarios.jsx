import React, { useState } from 'react';
import axios from 'axios';

import './StyleAutomacaoUsuarios.css'
import { toast } from 'react-toastify';

import Input from '../../components/Input'
import CustomButton from '../../components/CustomButton';
import NavBarUser from '../../components/NavBarUser';
import HeaderList from '../../components/HeaderList';

function AutomacaoUsuarios() {
  const [arquivoEnviado, setArquivoEnviado] = useState(false);
  const [dia, setDia] = useState('');
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const token = sessionStorage.getItem('token');

  const handleFileChange = (e) => {
    setArquivoSelecionado(e.target.files[0]);
  }

  const handlePreview = () => {
    if (arquivoSelecionado && dia) {

      if (dia.length !== 4 && !isNaN(dia)) {
        toast.error('Dia deve ser QUATRO números diamês ex.: 1022.', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return;
      }
      console.log(token)     

      const formData = new FormData();
      formData.append('file', arquivoSelecionado);
      formData.append('diaAdmissao', dia); 
  
      axios
        .post('http://HSRVWVP00030:8080/admissoes/enviar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`,
          },
        })
        .then((response) => {
          setArquivoEnviado(true);
          setUsuarios(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          toast.error(`Erro ao enviar arquivos: ${error}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      toast.error('Arquivo ou data de admissão não inserido.', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  

  const criarDeskManager = () => {
    if (arquivoSelecionado && dia) {      

      const formData = new FormData();
      formData.append('file', arquivoSelecionado);
      formData.append('diaAdmissao', dia); 
      
      axios.post("http://HSRVWVP00030:8080/admissoes/desk",  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      })
      .then(() => {
        toast.success("Usuários de DeskManager criados!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }).catch((error) => {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    } else {
      toast.error("Nenhum arquivo selecionado", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  }

  const criarWord = () => {
    if (arquivoSelecionado && dia) {      

      const formData = new FormData();
      formData.append('file', arquivoSelecionado);
      formData.append('diaAdmissao', dia); 

      axios.post("http://HSRVWVP00030:8080/admissoes/concluir", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      })
      .then(async () => {
        await toast.success("Words de colaboradores criados!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setArquivoEnviado(false);
        setArquivoSelecionado(null);
        setDia('');

      })
      .catch((error) => {
        toast.error(`Erro ao enviar arquivos: ${error}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    } else {
      toast.error('Nenhum arquivo ou data de admissão selecionados.', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  
  return (
    <div className="login-background">
      <span className='title-technipo'>AUTOMAÇÃO</span>
      <div className="app-background flex flex-col items-center">
        <NavBarUser backbtn={true} />

        {arquivoEnviado === false ? 
          <div className="w-5/6 h-4/6 mt-16 mb-16 bg-black/30 shadow-xl rounded-3xl flex flex-col justify-between items-center">          
            <div className="container-content-send-user">
              <div className="flex items-center justify-start mt-6">
                <label htmlFor="file-upload" className="px-4 py-2 mb-3 bg-orange-500/50 text-white rounded-xl cursor-pointer">
                  Arquivo de admissão
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {arquivoSelecionado && <p className="ml-4">{arquivoSelecionado.name}</p>}
              </div>
              <Input 
                type='text' 
                value={dia} 
                placeholder='Digite o dia da admissão ex.: 29 de Novembro = 2911'
                onChange={(e) => setDia(e.target.value)}
              />
              
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
                <div className='w-full mb-5 bg-white h-9 flex rounded-3xl items-center justify-start' key={index}>
                  <span className='text-sm w-56 ml-5 mr-1 truncate'>{usuario?.nome}</span>
                  <span className='text-sm w-28 mr-1 truncate'>{usuario?.usuario}</span>
                  <span className='text-sm w-32 mr-1 truncate'>{usuario?.senha}</span>
                  <span className='text-sm w-16 mr-1 truncate'>{usuario?.local}</span>
                  <span className='text-sm w-64 mr-1 truncate'>{usuario?.area}</span>
                  <span className='text-sm w-64 truncate'>
                    {usuario?.acessos.map((acesso, index) => (
                      <span key={index}>
                        {acesso}
                        {index !== usuario?.acessos?.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex m-5 w-full justify-end">
              <CustomButton
                text={"Criar Desk"}
                customSytle={"bg-orange-400"}
                onclick={criarDeskManager}
              />

              <CustomButton
                text={"Criar Word"}
                onclick={criarWord}
                customSytle={"bg-orange-600"}
              />
            </div>

          </div>
        }

        
      </div>
    </div>

    
  )
}



export default AutomacaoUsuarios;