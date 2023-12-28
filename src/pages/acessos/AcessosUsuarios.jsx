import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBarUser from '../../components/NavBarUser';
import ModalCriaPessoas from '../../components/ModalCriaPessoa';
import ModalPessoa from '../../components/ModalPessoa';
import ModalRightButton from '../../components/ModalRightButton';
import BackgroundTN from '../../components/BackgroundTN';

function Acessos() {
  const [pessoas, setPessoas] = useState([]);
  const [modalCriaPessoas, setModalCriaPessoas] = useState(false);
  const [modalButtonRight, setModalButtonRight] = useState(false);
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

  const handleContextMenu = (e) => {
    e.preventDefault();
    setModalButtonRight(true);
  }

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

  const BASE_URL = "https://dev-technipo.vercel.app:8080";
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get(`${BASE_URL}/sistemas/pessoas/filtra`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        setPessoas(response.data[0]);
      })
      .catch((err) => {
        handleError(err, "Erro ao obter pessoas");
      });
  }, [token, newlyCreatedPerson, updatedUser]);

  const fetchSistemas = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sistemas`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      setArraySistemas(response.data);
      setModalCriaPessoas(true);
    } catch (error) {
      handleError(error, "Erro ao obter sistemas");
    }
  };

  const handleOpenModalCriaPessoa = () => {
    fetchSistemas();
  };

  const handleCriaPessoa = async () => {
    const { name, cpf, dataAdmissao, dataNascimento, tipoContrato, categoria, sistemas, usuario, senha } = formData;
    const body = {
      ds_nome: name,
      nr_cpf: cpf,
      dt_admissao: dataAdmissao,
      dt_nascimento: dataNascimento,
      tp_contrato: tipoContrato,
      ds_categoria_cargo: categoria,
    };

    try {
      const response = await axios.post(`${BASE_URL}/pessoas`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const newPerson = response.data;
      setNewlyCreatedPerson(newPerson);
      setModalCriaPessoas(false);
      toast.success(response.data, toastConfig);

      const idPessoa = newPerson.id;
      await Promise.all(sistemas.map(async (idSistema) => {
        const sistemaPessoaBody = {
          id_pessoa: idPessoa,
          ds_nome: idSistema,
          ds_usuario: usuario,
          ds_senha: senha,
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
      }));

      resetFormData();
    } catch (error) {
      handleError(error, "Erro ao criar pessoa");
    }
  };

  const handleCloseModalCriaPessoa = () => {
    setModalCriaPessoas(false);
  };

  const handleOpenPessoa = (pessoaID) => {
    fetchSistemas()
    axios.get(`${BASE_URL}/sistemas/pessoas/${pessoaID}/filtra`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        setSelectedPersonID(pessoaID);
        setArraySistemaPessoa(response.data);
      })
      .catch((err) => {
        handleError(err, "Erro ao obter acessos da pessoa");
      })
      .finally(() => {
        setUpdatedUser(true);
      });
  };

  const handleClosePessoa = () => {
    setSelectedPersonID(null);
  };

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

  const handleError = (error, message) => {
    console.error(`${message}: ${error.data}`);
    toast.error(`${message}: ${error.data}`, toastConfig);
  };

  return (
    <BackgroundTN title="ACESSOS" customStyledApp={"flex flex-col items-center"}>
      <NavBarUser backbtn={true} />

      <section className="w-5/6 h-5/6 rounded-2xl bg-black/50 m-12 flex flex-col items-center">
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
            {pessoas.map((pessoa) => (
              <div
                className='w-full h-10 bg-white rounded-3xl pl-6 pr-6 mt-8'
                onClick={() => handleOpenPessoa(pessoa.ID)}
                onContextMenu={handleContextMenu}
                key={pessoa?.ID}
              >
                <div className="flex justify-start items-center h-full mr-3 w-full">
                  <div className="flex justify-center items-center h-full mr-3 ">
                    <span className='w-[40px] font-sans truncate'>{pessoa.ID}</span>
                  </div>
                  <div className="flex justify-start items-center h-full mr-3 w-1/3">
                    <span className='font-sans truncate'>{pessoa.NOME}</span>
                  </div>
                  <div className="flex justify-start items-center h-full ml-3 mr-3 w-2/3">
                    <span className='font-sans truncate'>{pessoa?.SISTEMAS || "Nenhum sistema cadastrado"}</span>
                  </div>
                </div>
              </div>
            ))}

            {modalCriaPessoas && (
              <ModalCriaPessoas
                onCloseModal={handleCloseModalCriaPessoa}
                formData={formData}
                setFormData={setFormData}
                arraySistemas={arraySistemas}
                createPessoa={handleCriaPessoa}
              />
            )}

            {selectedPersonID !== null && (
              <ModalPessoa
                onCloseModal={handleClosePessoa}
                arraySistemaPessoa={arraySistemaPessoa}
                arraySistemas={arraySistemas}
                formData={formData}
                setFormData={setFormData}
                token={token}
              />
            )}
{/* 
            {modalButtonRight !== false && (
              <ModalRightButton />
            )} */}

          </div>

          <div className='h-5/6 flex justify-end flex-col ml-3'>
            <button
              className='w-[40px] h-[40px] bg-lime-400 rounded-full flex items-center justify-center mt-3'
              onClick={handleOpenModalCriaPessoa}
            >
              <span className='text-4xl text-white'>+</span>
            </button>
          </div>
        </div>
      </section>
    </BackgroundTN>

  );
}

export default Acessos;
