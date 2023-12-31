import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBarUser from '../../components/NavBarUser';
import BackgroundTN from '../../components/BackgroundTN';

function MeuUsuario() {
  const [usuario, setUsuario] = useState([]);
  const [modalAlteraSenha, setModalAlteraSenha] = useState(false);
  const [modalResetaSenha, setModalResetaSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  const BASE_URL = "http://localhost:8080"

  useEffect(() => {

    axios.get(`${BASE_URL}/login/${userId}/infos`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      }
    })
      .then(response => {
        setUsuario(response.data);
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
          theme: "light",
        });
      })
  }, [token, userId])

  const handleAlteraSenha = async () => {
    const bodySenha = {
      senhaAtual: senhaAtual,
      novaSenha: novaSenha,
      confirmaNovaSenha: confirmaSenha
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    };

    await axios.put(`${BASE_URL}/login/${userId}`, bodySenha, config)
      .then((response) => {
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmaSenha("");
        setModalAlteraSenha(false);
        toast.success(response.data, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        setSenhaAtual("");
        setErrorStatus(true);
        toast.error(`Erro ao enviar arquivos: ${err}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };


  const handleResetaSenha = () => {
    axios.put(`${BASE_URL}/login/${userId}/reset`)
      .then((res) => {
        toast.success(res.data, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setModalResetaSenha(false)
      })
      .catch((err) => {
        toast.error(`Erro ao enviar arquivos: ${err}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }

  return (
    <BackgroundTN title={""} customStyledApp={"flex flex-col items-center"}>
      <NavBarUser />

      <div className="flex flex-col w-3/6 h-5/6 bg-white rounded-xl items-center mt-10">
        <div className='flex flex-col w-4/5 h-4/6'>
          {usuario[0] ? (
            usuario[0].map((user, index) => (
              <>
                <div className='flex w-full justify-center'>
                  <h1 className='font-bold font-sans text-emerald-700 text-3xl mb-10 mt-6'>{user.NOME}</h1>
                </div>

                <div className='w-full flex h-10 items-center mb-2' key={index}>
                  <label className='text-lime-500 font-semibold'>Usuário: </label>
                  <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                    <span className=''>{user.USUARIO}</span>
                  </div>
                </div>

                <div className='w-full flex h-10 items-center mb-2' key={index}>
                  <label className='text-lime-500 font-semibold'>Email: </label>
                  <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                    <span className=''>{user.EMAIL}</span>
                  </div>
                </div>

                <div className='w-full flex h-10 items-center mb-2' key={index}>
                  <label className='text-lime-500 font-semibold'>CPF: </label>
                  <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                    <span className=''>{user.CPF}</span>
                  </div>
                </div>

                <div className='w-full flex h-10 items-center mb-2' key={index}>
                  <label className='text-lime-500 font-semibold'>Admissão: </label>
                  <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                    <span className=''>{user.ADMISSAO}</span>
                  </div>
                </div>

                <div className='w-full flex h-10 items-center mb-2' key={index}>
                  <label className='text-lime-500 font-semibold '>Nascimento: </label>
                  <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                    <span className=''>{user.NASCIMENTO}</span>
                  </div>
                </div>

                <div className='flex flex-row'>
                  <div className='w-full flex h-10 items-center mb-2' key={index}>
                    <label className='text-lime-500 font-semibold'>Contrato: </label>
                    <div className='w-3/4 mr-3 ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                      <span className=''>{user.TIPO_DE_CONTRATO}</span>
                    </div>
                  </div>

                  <div className='w-full flex h-10 items-center mb-2' key={index}>
                    <label className='text-lime-500 font-semibold '>Categoria: </label>
                    <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                      <span className=''>{user.CATEGORIA}</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-row'>
                  <div className='w-full flex h-10 items-center mb-2' key={index}>
                    <label className='text-lime-500 font-semibold'>Cargo: </label>
                    <div className='w-3/4 mr-3 ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                      <span className=''>{user.CARGO}</span>
                    </div>
                  </div>

                  <div className='w-full flex h-10 items-center mb-2' key={index}>
                    <label className='text-lime-500 font-semibold '>Setor: </label>
                    <div className='w-full ml-3 pl-3 bg-stone-200 h-10 flex items-center rounded-xl'>
                      <span className=''>{user.SETOR}</span>
                    </div>
                  </div>
                </div>
              </>


            ))
          ) : (
            <p>Aguardando dados do usuário...</p>
          )}

          <div className='flex justify-center w-full mt-10'>
            <button
              className='h-12 bg-lime-400 w-4/12 filter drop-shadow-md rounded-xl border-0 font-mono text-white text-lg transition duration-300 hover:scale-103'
              onClick={() => setModalAlteraSenha(true)}
            >
              <span>Alterar senha</span>
            </button>

            <button
              className='h-12 bg-lime-400 w-4/12 ml-5 filter drop-shadow-md rounded-xl border-0 font-mono text-white text-lg transition duration-300 hover:scale-103'
              onClick={() => setModalResetaSenha(true)}
            >
              <span >Reseta senha</span>
            </button>
          </div>

          {modalAlteraSenha && (
            <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
              <div className='fixed bg-white rounded-xl p-6 m-4 max-w-md'>
                <h2 className="text-xl font-bold mb-4 text-emerald-700">Alterar senha</h2>

                <input
                  type="password"
                  placeholder="Senha atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className={`block w-full p-2 mb-3 border rounded-md ${errorStatus ? 'border-red-600' : ''}`}
                />

                <input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className={`block w-full p-2 mb-3 border rounded-md ${errorStatus ? 'border-red-600 text-red-600' : ''}`}
                />

                <input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  className={`block w-full p-2 mb-3 border rounded-md ${errorStatus ? 'border-red-600 text-red-600' : ''}`}
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleAlteraSenha}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => {
                      setErrorStatus(false);
                      setSenhaAtual("");
                      setNovaSenha("");
                      setConfirmaSenha("");
                      setModalAlteraSenha(false);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {modalResetaSenha && (
            <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto'>
              <div className='fixed bg-white rounded-xl p-6 m-4 max-w-xl'>
                <p className=''>Tem certeza que deseja resetar sua senha para
                  <span className='text-lime-500'>"Hospital@2023"</span>
                  ??
                </p>

                <div className='flex w-full justify-end'>
                  <button
                    className='ml-5 mt-5 px-4 py-2 bg-green-500 text-white rounded-md'
                    onClick={handleResetaSenha}
                  >Resetar</button>
                  <button
                    className='ml-5 mt-5 px-4 py-2 bg-lime-400 text-white rounded-md'
                    onClick={() => setModalResetaSenha(false)}
                  >Cancelar</button>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </BackgroundTN>

  );
}

export default MeuUsuario;