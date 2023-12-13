import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function ModalPessoa({ onCloseModal, arraySistemaPessoa }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedSenha, setEditedSenha] = useState('');

  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  const handleOpenEdit = (userId) => {
    setEditingUserId(userId);
  
    // Encontrar o usuário pelo ID para obter os valores atuais
    const userToEdit = arraySistemaPessoa[0].find(user => user.ID_SISTEMA_PESSOA === userId);
  
    if (userToEdit) {
      setEditedUsername(userToEdit.USERNAME);
      setEditedSenha(userToEdit.SENHA);
    }
  }
  
  const handleSaveEdit = () => {
    // Lógica para salvar as alterações. Pode ser uma chamada à API, por exemplo.
    // Após salvar, você pode limpar o estado de edição.
    setEditingUserId(null);
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
                        <button>Salvar</button>
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
                          // onClick={() => handleDelete(acesso.ID)}
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
                          <button onClick={() => setEditingUserId(null)}>cancelar</button>
                        </div>
                      </>
                      ) : (
                        <span>{acesso?.SENHA}</span>
                      )
                    }
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
