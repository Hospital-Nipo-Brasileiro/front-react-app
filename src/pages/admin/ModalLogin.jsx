import React, { useState } from 'react';
import { Service } from '../../services/Service';
import { toast } from 'react-toastify';
import { toastConfig } from '../../services/toastConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faEyeSlash, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import ModalDesativaAcesso from './ModalDesativaAcesso';

function ModalLogin({
  onCloseModal,
  loginInfos,
  token
}) {
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [mostraSenha, setMostraSenha] = useState('');
  const [novoUsuario, setNovoUsuario] = useState('');
  const [modalDesativaAcesso, setModalDesativaAcesso] = useState(false);

  const handleCloseLogin = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  const handleMostraSenha = () => {
    try {
      Service.get(`/login/${loginInfos.ID}`, (error, data) => {
        if(error) {
          toast.error(error, toastConfig)
        } else {
          setMostraSenha(data.data.ds_password)
        }
      }, token);
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
      Service.delete(`/login/${loginInfos.ID}`, (error, data)=> {
        if(error) {
          toast.error(error, toastConfig);
        } else {
          console.log(data)
          // toast.success(data, toastConfig);
          // setModalDesativaAcesso(false);
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
          <h3 className='text-lime-500 block font-bold mb-5 text-lg'>{loginInfos.NOME}</h3>

          <div className='w-full h-24 bg-slate-100 rounded-2xl p-3 mt-5'>
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <div className='flex flex-row items-center'>
                  <span className='w-20 text-lime-500 font-bold mr-2'>Username: </span>
                  {editandoUsuario === true ? (
                    <input
                      className="bg-slate-200 p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                      type="text"
                      value={novoUsuario}
                      onChange={(e) => setNovoUsuario(e.target.value)}
                    />
                  ) : (
                    <span className='text-sm 2xl:text-base text-gray-700'>{loginInfos?.USUARIO}</span>
                  )}
                </div>

                <div className='w-full flex flex-row items-center justify-between'>
                  <div className='w-full flex flex-row items-center'>
                    <span className='w-20 text-lime-500 font-bold mr-2'>Senha: </span>
                    {editandoUsuario === true ? (
                      <input
                        className="bg-slate-200 p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                        type="text"
                        value={novoUsuario}
                        onChange={(e) => setNovoUsuario(e.target.value)}
                      />
                    ) : (
                    <>
                      {mostraSenha !== '' ? (
                        <span className='text-sm 2xl:text-base text-gray-700'>{mostraSenha}</span>
                      ) : (<span className='text-sm 2xl:text-base text-gray-700'>********</span>)}
                    </>
                    )}
                  </div>
                  
                  <div className='flex flex-row'>
                    {mostraSenha !== '' ? (<FontAwesomeIcon icon={faEye} onClick={handleOcultaSenha}/>) 
                      : (<FontAwesomeIcon icon={faEyeSlash}  onClick={handleMostraSenha}/>)
                    }
                    
                    <FontAwesomeIcon icon={faUserEdit} className='ml-3 text-emerald-500' />

                    <FontAwesomeIcon icon={faTrash} className='ml-3 text-emerald-900' onClick={handleOpenModalDesativaAcesso}/>

                    {modalDesativaAcesso && (
                      <ModalDesativaAcesso 
                        onCloseModal={() => setModalDesativaAcesso(false)}
                        handleDesativaAcesso={handleDesativaAcesso}
                      />
                    )}
                  </div>
                </div>
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