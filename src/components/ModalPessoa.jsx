import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from './Input';
import MultiSelect from './SelectIcon/MultiSelect.tsx';


function ModalPessoa({ onCloseModal, arraySistemaPessoa, token, formData, setFormData }) {
  const BASE_URL = `http://localhost:8080`
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedSenha, setEditedSenha] = useState('');
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [vinculaUser, setVinculaUser] = useState(false);
  const [arraySistema, setArraySistemas] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL}/sistemas`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    })
      .then(response => {
        setArraySistemas(response.data)
      })
      .catch(error => {
        console.error('Erro ao obter opções de sistema:', error);
      });
  }, []);

  const toastConfig = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

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
          theme: "light",
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
          theme: "light",
        });
      })

    setEditingUserId(null)
  }

  const handleOpenDeleteConfirmation = (id) => {
    setDeletedUserId(id);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeletedUserId(null);
  };

  const handleDeleteConfirmation = (id) => {
    handleInativaAcesso(id);
    setDeletedUserId(null);
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
          theme: "light",
        });
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
          theme: "light",
        });
      })
  }

  const handleOpenVinculaUser = () => {
    setVinculaUser(true);
  }

  const handleCloseVinculaUser = () => {
    setVinculaUser(false);
    setFormData("")
  }

  const vinculaUsuarioAUmSistema = () => {
    const {usuario, senha, sistemas} = formData;

    try {
      sistemas.forEach((sistema) => {
        const sistemaPessoaBody = {
          id_pessoa: arraySistemaPessoa[0][0]?.ID,
          ds_nome: sistema,
          ds_usuario: usuario,
          ds_senha: senha,
        };
      
      console.log(sistemaPessoaBody)
  
      axios.post(`${BASE_URL}/sistemas/pessoas`, sistemaPessoaBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })
        .catch((error) => {
          toast.error(`${error.data}`, toastConfig);
        })
      })
      toast.success(`Usuário vinculado a acessos`, toastConfig);
      handleCloseVinculaUser()
    } catch (error) {
      toast.error(`error.data`, toastConfig);
      handleCloseVinculaUser()
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">

      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <h1 className='text-xl text-emerald-600 font-bold'>{arraySistemaPessoa[0][0]?.NOME}</h1>
        <div className='w-full h-full mb-10 overflow-auto'>
          {arraySistemaPessoa && arraySistemaPessoa[0].length >= 1 && arraySistemaPessoa[0][0]?.SISTEMA !== null ? (
            arraySistemaPessoa[0].map((acesso) => (
              <div className='w-full h-24 bg-slate-100 rounded-2xl p-3 mt-5' key={acesso?.ID_SISTEMA_PESSOA}>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <span className='w-20 text-lime-500 font-bold'>Sistema: </span>
                    <span>{acesso?.SISTEMA}</span>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-row w-full'>
                      <span className='text-lime-500 w-20'>Usuário: </span>
                      {editingUserId === acesso.ID_SISTEMA_PESSOA ? (
                        <input
                          className="bg-slate-200 p-1 w-2/4 mb-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
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
                          className='bg-lime-400 w-20 rounded-xl text-white'
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
                          className='cursor-pointer text-emerald-600'
                          title='Excluir'
                          onClick={() => {
                            console.log("ACESSO: ", acesso?.ID_SISTEMA_PESSOA)
                            handleOpenDeleteConfirmation(acesso?.ID_SISTEMA_PESSOA)
                          }
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>

                    )}
                  </div>
                  <div className='flex w-full'>
                    <span className='w-20 text-lime-500'>Senha: </span>
                    {editingUserId === acesso.ID_SISTEMA_PESSOA ? (
                      <>
                        <input
                          className="bg-slate-200 w-2/4 mb-1 p-1 h-6 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                          type="text"
                          value={editedSenha}
                          onChange={(e) => setEditedSenha(e.target.value)}
                        />

                        <div className='w-2/4 flex justify-end'>
                          <button
                            className='bg-emerald-600 w-20 rounded-xl text-white'
                            onClick={() => setEditingUserId(null)}
                          >Cancelar</button>
                        </div>
                      </>
                    ) : (
                      <span>{acesso?.SENHA}</span>
                    )
                    }

                    {deletedUserId === acesso.ID_SISTEMA_PESSOA ? (
                      <div className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div className="absolute w-2/3 h-1/3 bg-white rounded-lg p-8 flex flex-col">
                          <span className="text-xl font-bold mb-4">Confirmar Desativação</span>
                          <span className="mb-4">Tem certeza que deseja desativar este acesso?</span>
                          <div className="flex justify-end">
                            <button
                              className="bg-lime-400 w-1/5 mr-4 h-[60px] rounded-2xl text-white"
                              onClick={() => handleDeleteConfirmation(deletedUserId)}
                            >
                              Confirmar
                            </button>
                            <button
                              className="bg-gray-300 w-1/5 h-[60px] rounded-2xl"
                              onClick={handleCloseDeleteConfirmation}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (<></>)}


                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <span className='text-xl'>Usuário não contem nenhum sistema vinculado.</span>
            </div>
          )}


        </div>

        <div className='w-full flex justify-end'>
          <button
            className='bg-lime-400 w-1/5 mr-5 h-[60px] rounded-2xl '
            onClick={handleOpenVinculaUser}
          >
            <span className='text-white text-xl'>Adicionar Acessos</span>
          </button>

          {vinculaUser === true ? (
            <div className="fixed top-7 left-0 w-full h-full flex items-center justify-center z-50">
              <div className="absolute w-2/3 h-[60%] bg-white rounded-lg p-8 flex flex-col justify-between">
                <div className='w-2/5'>
                  <Input
                    label={"Usuário"}
                    placeholder='Digite o usuário'
                    value={formData.usuario}
                    onChange={(e) => handleInputChange("usuario", e.target.value)}
                  />

                  <Input
                    label={"Senha"}
                    placeholder='Digite a senha'
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                  />

                  <div>
                    <label className="text-lime-500">Sistemas</label>
                    <MultiSelect
                      name="sistemas"
                      size="normal"
                      optionList={arraySistema?.map((sistema) => ({ label: sistema.ds_nome })) || []}
                      value={formData.sistemas}
                      valueChange={(newValue) => handleInputChange("sistemas", newValue)}
                      placeholder="Selecione os sistemas"
                    />

                  </div>

                </div>
                <div className='flex justify-end'>
                  <button
                    className='bg-lime-400 w-1/5 ml-5 h-[60px] rounded-2xl'
                    onClick={vinculaUsuarioAUmSistema}
                  >
                    <span className='text-white text-xl'>Vincular</span>
                  </button>
                  <button
                    className='bg-lime-900 w-1/5 ml-5 h-[60px] rounded-2xl'
                    onClick={handleCloseVinculaUser}
                  >
                    <span className='text-white text-xl'>Fechar</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (null)}

          <button
            className='bg-lime-900 w-1/5 ml-5 h-[60px] rounded-2xl'
            onClick={handleCloseModal}
          >
            <span className='text-white text-xl'>Fechar</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalPessoa;