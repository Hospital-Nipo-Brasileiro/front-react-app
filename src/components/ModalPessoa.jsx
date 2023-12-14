import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ModalPessoa({ onCloseModal, arraySistemaPessoa, token}) {
  const BASE_URL = `http://HSRVWVH00028:8080`
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedSenha, setEditedSenha] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  const handleOpenEdit = (userId) => {
    setEditingUserId(userId);

    const userToEdit = arraySistemaPessoa[0].find(user => user.ID_SISTEMA_PESSOA === userId);
  
    if (userToEdit) {
      setEditedUsername(userToEdit.USERNAME);
      setEditedSenha(userToEdit.SENHA);
    }
  }

  const handleAlteraAcesso = (id) => {
    const body = {
      ds_usuario: editedUsername,
      ds_senha: editedSenha
    }
    
    axios.put(`${BASE_URL}/sistemas/pessoas/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then(async (response) => {
        toast.success(response.data, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const pessoaAtualizada = response.data;

        // Atualizar o estado local com os novos dados
        const novoArraySistemaPessoa = arraySistemaPessoa[0].map((pessoa) => {
          return pessoa.ID_SISTEMA_PESSOA === pessoaAtualizada.ID_SISTEMA_PESSOA
            ? pessoaAtualizada
            : pessoa;
        });

        // Atualizar o estado diretamente com o novo array
        arraySistemaPessoa[0] = novoArraySistemaPessoa;

        setEditingUserId(null);
      })
      .catch(async (err) => {
        await toast.error(`Erro ao obter acessos da pessoa: ${err.data}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })

    setEditingUserId(null)
  }

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteConfirmation = (id) => {
    // Perform the delete operation here
    handleInativaAcesso(id);
    setShowConfirmationModal(false);
  };
  
  const handleInativaAcesso = (id) => {
    axios.delete(`${BASE_URL}/sistemas/pessoas/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then(async (response) => {
        await toast.success(response.data, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleOpenConfirmationModal()
      })
      .catch(async (err) => {
        await toast.error(`Erro ao obter acessos da pessoa: ${err.data}`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <div className='w-full h-full mb-10 overflow-auto'>
          {arraySistemaPessoa[0] && arraySistemaPessoa[0].length >= 1 && arraySistemaPessoa[0][0]?.SISTEMA !== null ? (
            arraySistemaPessoa[0].map((acesso) => (
              <div className='w-full h-24 bg-slate-100 rounded-2xl p-3 mt-5' key={acesso?.ID}>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <span className='w-20 text-orange-500 font-bold'>Sistema: </span>
                    <span>{acesso?.SISTEMA}</span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-row w-full'>
                      <span className='text-orange-500 w-20'>Usuário: </span>
                      {editingUserId === acesso.ID_SISTEMA_PESSOA ? (
                        <input
                          className="bg-slate-200 p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-600"
                          type="text"
                          value={editedUsername}
                          onChange={(e) => setEditedUsername(e.target.value)}
                        />
                        ) : (
                        <span>{acesso?.USERNAME}</span>
                      )}
                    </div>
                    {editingUserId === acesso.ID_SISTEMA_PESSOA ? (
                      <div>
                        <button
                          className='bg-orange-500 w-20 rounded-xl text-white'
                          onClick={() => handleAlteraAcesso(acesso.ID_SISTEMA_PESSOA)}
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <div className='flex flex-row'>
                        <span
                          className='cursor-pointer text-lime-500 mr-2'
                          title='Editar'
                          onClick={() => handleOpenEdit(acesso.ID_SISTEMA_PESSOA)}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        <span
                          className='cursor-pointer text-orange-600'
                          title='Excluir'
                          onClick={() => handleOpenConfirmationModal()}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>

                    )}
                  </div>
                  <div className='flex w-full'>
                    <span className='w-20 text-orange-500'>Senha: </span>
                    {editingUserId === acesso.ID_SISTEMA_PESSOA ? (
                      <>
                        <input
                          className="bg-slate-200 w-2/4 mb-1 p-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-600"
                          type="text"
                          value={editedSenha}
                          onChange={(e) => setEditedSenha(e.target.value)}
                          />
                        
                        <div className='w-2/4 flex justify-end'>
                          <button 
                            className='bg-orange-600 w-20 rounded-xl text-white'
                            onClick={() => setEditingUserId(null)}
                            >Cancelar</button>
                        </div>
                      </>
                      ) : (
                        <span>{acesso?.SENHA}</span>
                      )
                    }

                    {showConfirmationModal && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div className="absolute w-2/3 h-1/3 bg-white rounded-lg p-8 flex flex-col">
                          <span className="text-xl font-bold mb-4">Confirmar Exclusão</span>
                          <span className="mb-4">Tem certeza que deseja excluir este acesso?</span>
                          <div className="flex justify-end">
                            <button
                              className="bg-orange-500 w-1/5 mr-4 h-[60px] rounded-2xl text-white"
                              onClick={() => handleDeleteConfirmation(editingUserId)}
                            >
                              Confirmar
                            </button>
                            <button
                              className="bg-gray-300 w-1/5 h-[60px] rounded-2xl"
                              onClick={handleCloseConfirmationModal}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
      
                </div>
              </div>
            ))
            ) : (
            <div className='w-full h-full flex flex-col items-center'>
              <span>Usuário não contem nenhum sistema vinculado.</span>
              <button className='w-36 h-16 bg-orange-500 text-white rounded-2xl mt-10'>
                Adicionar novo sistema
              </button>
            </div>
          )}


      </div>

        <button
          className='bg-orange-500 w-1/5 mr-10 h-[60px] rounded-2xl'
          onClick={handleCloseModal}
          >
          <span className='text-white text-xl'>Fechar</span>
        </button>
        
      </div>
    </div>
  );
}

export default ModalPessoa;
