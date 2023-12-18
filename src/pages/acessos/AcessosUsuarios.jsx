import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBarUser from '../../components/NavBarUser';
import ModalCriaPessoas from '../../components/ModalCriaPessoa';
import ModalPessoa from '../../components/ModalPessoa';

function Acessos() {
  const [pessoas, setPessoas] = useState([]);
  const [modalCriaPessoas, setModalCriaPessoas] = useState(false);
  const [selectedPersonID, setSelectedPersonID] = useState(null);
  const [arraySistemaPessoa, setArraySistemaPessoa] = useState([]);
  const [updatedUser, setUpdatedUser] = useState(false);
  const [arraySistemas, setArraySistemas] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    dataAdmissao: "",
    dataNascimento: "",
    tipoContrato: "",
    categoria: "",
    sistemas: [],
  });
  const [newlyCreatedPerson, setNewlyCreatedPerson] = useState(null);

  const resetFormData = () => {
    setFormData({
      name: "",
      cpf: "",
      dataAdmissao: "",
      dataNascimento: "",
      tipoContrato: "",
      categoria: "",
      usuario: "",
      senha: "",
      sistemas: [],
    });
  };

  const BASE_URL = "http://HSRVWVH00028:8080";
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get(`${BASE_URL}/sistemas/pessoas/filtra`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((err) => {
        toast.error(err.data, {
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
  }, [token, newlyCreatedPerson]);

  const fetchSistemas = () => {
    axios.get(`${BASE_URL}/sistemas`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        setArraySistemas(response.data);
        setModalCriaPessoas(true);
      });
  };

  const handleOpenModalCriaPessoa = () => {
    fetchSistemas();
  };

  const handleCriaPessoa = () => {
    const { name, cpf, dataAdmissao, dataNascimento, tipoContrato, categoria, sistemas } = formData;
    const body = {
      ds_nome: name,
      nr_cpf: cpf,
      dt_admissao: dataAdmissao,
      dt_nascimento: dataNascimento,
      tp_contrato: tipoContrato,
      ds_categoria_cargo: categoria
    };
  
    axios.post(`${BASE_URL}/pessoas`, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then(async (response) => {
        const newPerson = response.data;
        setNewlyCreatedPerson(newPerson);
        setModalCriaPessoas(false);
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
  
        const idPessoa = newPerson.id;
        sistemas.forEach(async (idSistema) => {

          const sistemaPessoaBody = {
            id_pessoa: idPessoa,
            ds_nome: idSistema,
            ds_usuario: formData.usuario,
            ds_senha: formData.senha
          };
  
          try {
            await axios.post(`${BASE_URL}/sistemas/pessoas`, sistemaPessoaBody, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
              },
            });
          } catch (error) {
            console.error(`Erro ao vincular sistema à pessoa: ${error}`);
          }
        });
  
        resetFormData();
      })
      .catch((error) => {
        toast.error(`Erro ao criar pessoa: ${error.data}`, {
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
  };

  const handleCloseModalCriaPessoa = () => {
    setModalCriaPessoas(false);
  };

  const handleOpenPessoa = (pessoaID) => {
    setSelectedPersonID(pessoaID);
    axios.get(`${BASE_URL}/sistemas/pessoas/${pessoaID}/filtra`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        setArraySistemaPessoa(response.data);
        console.log(arraySistemaPessoa)
      })
      .catch ((err) => {
        toast.error(`Erro ao obter acessos da pessoa: ${err.data}`, {
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
    
  const handleClosePessoa = () => {
    setSelectedPersonID(null);
  };

  return (
    <div className="login-background">
      <span className='title-technipo'>ACESSOS</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true} />

        <section className="w-5/6 h-5/6 rounded-3xl bg-black/50 m-12 flex flex-col items-center">
          <nav className="w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center">
            <div className="w-10/12 flex justify-start pl-6 pr-6">
              <div className="flex justify-center items-center h-full mr-3 ">
                <span className='w-[40px] font-sans font-bold'>id</span>
              </div>
              <div className="flex justify-start items-center h-full mr-3 w-1/3">
                <span className='font-sans font-bold'>nome</span>
              </div>
              <div className="flex justify-start items-center h-full ml-3 mr-3 w-2/3">
                <span className='font-sans font-bold'>acessos</span>
              </div>
            </div>
          </nav>

          <div className='w-full h-full flex justify-center mt-5'>
            <div className='w-5/6 h-5/6 overflow-auto'>

              {modalCriaPessoas && (
                <ModalCriaPessoas
                  onCloseModal={handleCloseModalCriaPessoa}
                  formData={formData}
                  setFormData={setFormData}
                  arraySistemas={arraySistemas}
                  createPessoa={handleCriaPessoa}
                />
              )}

              {pessoas.map((pessoa) => (
                <div
                  className='w-full h-10 bg-white rounded-3xl pl-6 pr-6 mt-8'
                  onClick={() => handleOpenPessoa(pessoa.ID)}
                  key={pessoa.ID}
                >
                  <div className="flex justify-start items-center h-full mr-3 w-full">
                    <div className="flex justify-center items-center h-full mr-3 ">
                      <span className='w-[40px] font-sans'>{pessoa.ID}</span>
                    </div>
                    <div className="flex justify-start items-center h-full mr-3 w-1/3">
                      <span className='font-sans'>{pessoa.NOME}</span>
                    </div>
                    <div className="flex justify-start items-center h-full ml-3 mr-3 w-2/3">
                      <span className='font-sans'>{pessoa?.SISTEMAS || "Nenhum sistema cadastrado"}</span>
                    </div>
                  </div>
                </div>
              ))}

              {selectedPersonID !== null && (
                <ModalPessoa 
                  onCloseModal={handleClosePessoa} 
                  arraySistemaPessoa={arraySistemaPessoa}
                  token={token}
                />
              )}

            </div>

            <div className='h-5/6 flex justify-end flex-col ml-3'>
              <button
                className='w-[40px] h-[40px] bg-orange-500 rounded-full flex items-center justify-center mt-3'
                onClick={handleOpenModalCriaPessoa}
              >
                <span className='text-4xl text-white'>+</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Acessos;
