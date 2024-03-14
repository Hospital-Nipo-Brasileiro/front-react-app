import React, { useState } from 'react';
import { API } from '../../services/apiService';
import { toast } from 'react-toastify';
import { toastConfig } from '../../services/toastConfigService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faEye, faEyeSlash, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ModalDesativaAcesso from './ModalDesativaAcesso';

function ModalLogin({
  onCloseModal,
  loginInfos,
  setLogins,
  token
}) {
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaNovaSenha, setConfirmaNovaSenha] = useState('');
  const [mostraSenha, setMostraSenha] = useState('');
  const [modalDesativaAcesso, setModalDesativaAcesso] = useState(false);

  const handleCloseLogin = () => {
    if (onCloseModal) {
      setEditandoUsuario(false);
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmaNovaSenha('');
      setMostraSenha('');
      setModalDesativaAcesso(false);
      onCloseModal();
    }
  }

  const handleMostraSenha = () => {
    try {
      API.get(`/login/${loginInfos.ID}`, (error, data) => {
        if (error) {
          toast.error(error, toastConfig)
        } else {
          setMostraSenha(data.data.ds_password)
        }
      }, token);
    } catch (error) {
      toast.error(error, toastConfig)
    }
  }

  const handleEditaUsuario = () => {
    setEditandoUsuario(true);
  }

  const handleCancelEditaUsuario = () => {
    setEditandoUsuario(false);
  }

  const handleSalvaUsuarioEditado = () => {
    const body = {
      senhaAtual: senhaAtual,
      novaSenha: novaSenha,
      confirmaNovaSenha: confirmaNovaSenha
    }

    try {
      API.put(`/login/${loginInfos.ID}`, body, (err, data) => {
        if (err) {
          toast.error(err, toastConfig)
        } else {
          toast.success("Senha alterada com sucesso!", toastConfig)
          handleCloseLogin();
        }
      }, token)
    } catch (error) {
      toast.error(error, toastConfig)
    }
  }

  const handleOcultaSenha = () => {
    setMostraSenha('')
  }

  const handleOpenModalDesativaAcesso = () => {
    setModalDesativaAcesso(true);
  }

  const handleDesativaAcesso = () => {
    try {
      API.delete(`/login/${loginInfos.ID}`, (error, data) => {
        if (error) {
          toast.error(error, toastConfig);
        } else {
          toast.success('Usuário desativado', toastConfig);
          setModalDesativaAcesso(false);
          onCloseModal()
          try {
            API.get('/login', (error, data) => {
              if (error) {
                toast.error(error, toastConfig)
              } else {
                setLogins(data.data);
              }
            }, token);
          } catch (error) {
            toast.error(error, toastConfig);
          }
        }
      }, token);
    } catch (error) {
      toast.error(error, toastConfig);
    }
  }

  return (
    <div className="fixed top-9 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">
        <div className='w-full h-full'>
          <h3 className='text-lime-500 block font-bold mb-5 text-lg'>{loginInfos?.NOME}</h3>

          <div className='w-full h-24 bg-slate-100 rounded-2xl p-3 mt-5'>
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <div className='flex flex-row items-center'>
                  {editandoUsuario === true ? (
                    <>
                      <span className='w-28 text-lime-500 font-bold mr-2'>Senha Atual:</span>
                      <input
                        className="bg-slate-200 p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                        type="text"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <span className='w-20 text-lime-500 font-bold mr-2'>Username: </span>
                      <span className='text-sm 2xl:text-base text-gray-700'>{loginInfos?.USUARIO}</span>
                    </>
                  )}
                </div>

                <div className='w-full flex flex-row items-center justify-between'>
                  <div className='w-full flex flex-row items-center'>
                    {editandoUsuario === true ? (
                      <>
                        <span className='w-28 text-lime-500 font-bold mr-2'>Nova senha: </span>
                        <input
                          className="bg-slate-200 top-[-15px] p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                          type="text"
                          value={novaSenha}
                          onChange={(e) => setNovaSenha(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <span className='w-20 text-lime-500 font-bold mr-2'>Senha: </span>
                        {
                          mostraSenha !== '' ? (
                            <span className='text-sm 2xl:text-base text-gray-700'>{mostraSenha}</span>
                          ) : 
                          (
                            <span className='text-sm 2xl:text-base text-gray-700'>********</span>
                          )
                        }
                      </>
                    )}
                  </div>

                  <div className='flex flex-row justify-center'>


                    {editandoUsuario === true ? (
                      <>
                        <FontAwesomeIcon icon={faCancel} className='mr-5 mt-1 cursor-pointer text-emerald-500' onClick={handleCancelEditaUsuario} />
                        <button
                          className='bg-lime-400 w-20 rounded-xl text-white'
                          onClick={handleSalvaUsuarioEditado}
                        >
                          Salvar
                        </button>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUserEdit} className='ml-3 text-emerald-500 cursor-pointer' onClick={handleEditaUsuario} />
                        <FontAwesomeIcon icon={faTrash} className='ml-3 text-emerald-900 cursor-pointer' onClick={handleOpenModalDesativaAcesso} />
                      </>
                    )}

                    {modalDesativaAcesso && (
                      <ModalDesativaAcesso
                        onCloseModal={() => setModalDesativaAcesso(false)}
                        handleDesativaAcesso={handleDesativaAcesso}
                      />
                    )}
                  </div>
                </div>

                {editandoUsuario === true ? (
                  <div>
                    <span className='w-28 text-lime-500 font-bold mr-2'>Confirma nova senha: </span>
                    <input
                      className="bg-slate-200 top-[-15px] p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                      type="text"
                      value={confirmaNovaSenha}
                      onChange={(e) => setConfirmaNovaSenha(e.target.value)}
                    />
                  </div>
                ) : <></>}
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-end'>
          <button
            className='bg-lime-900 w-1/5 h-[60px] rounded-2xl'
            onClick={handleCloseLogin}
          >
            <span className='text-white text-xl'>Fechar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;