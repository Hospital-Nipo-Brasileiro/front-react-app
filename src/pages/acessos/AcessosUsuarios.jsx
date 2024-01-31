import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBarUser from '../../components/NavBarUser';
import ModalCriaPessoas from './ModalCriaPessoa';
import ModalPessoa from './ModalPessoa';
import BackgroundTN from '../../components/BackgroundTN';
import { toastConfig } from '../../services/toastConfigService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL, PORT_ } from '../../services/apiService';
import { FetchData } from '../../services/mockFetchDatasService';

function Acessos() {
  const [pessoas, setPessoas] = useState([]);
  const [modalCriaPessoas, setModalCriaPessoas] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [arraySistemaPessoa, setArraySistemaPessoa] = useState([]);
  const [arraySistemas, setArraySistemas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    dataAdmissao: '',
    dataNascimento: '',
    tipoContrato: '',
    categoria: '',
    sistemas: [],
  });

  const resetFormData = () => {
    setFormData({
      name: '',
      cpf: '',
      dataAdmissao: '',
      dataNascimento: '',
      tipoContrato: '',
      categoria: '',
      usuario: '',
      senha: '',
      sistemas: [],
    });
  };

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    FetchData.sistemasPorTodasPessoas({ setPessoas, token })
  }, [token]);

  const handleOpenModalCriaPessoa = () => {
    FetchData.sistemas({ setArraySistemas, token })
    setModalCriaPessoas(true);
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
      const response = await axios.post(`${BASE_URL}:${PORT_}/pessoas`, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const newPerson = response.data;
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
          await axios.post(`${BASE_URL}:${PORT_}/sistemas-pessoas`, sistemaPessoaBody, {
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
      handleError(error, 'Erro ao criar pessoa');
    }
  };

  const handleCloseModalCriaPessoa = () => {
    setModalCriaPessoas(false);
  };

  const handleOpenPessoa = (idPessoa) => {
    FetchData.sistemasPorIdPessoa({
      idPessoa: idPessoa,
      setPessoaSelecionada: setPessoaSelecionada,
      setArraySistemasPorPessoa: setArraySistemaPessoa,
      token: token
    });
  };

  const handleClosePessoa = () => {
    setPessoaSelecionada(null);
  };

  const handleError = (error, message) => {
    console.error(`${message}: ${error.data}`);
    toast.error(`${message}: ${error.data}`, toastConfig);
  };

  return (
    <BackgroundTN title='ACESSOS' customStyledApp={'flex flex-col items-center'}>
      <NavBarUser backbtn={true} />

      <div className='w-full h-full flex justify-center items-center'>

        <section className='w-5/6 h-5/6 my-3 rounded-3xl bg-black/50 flex flex-col items-center'>
          <nav className='w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center'>
            <div className='w-10/12 flex justify-start px-6'>
              <div className='flex justify-center items-center h-full mr-3 '>
                <span className='w-[40px] font-sans font-bold'>id</span>
              </div>
              <div className='flex justify-start items-center h-full mr-3 w-1/3'>
                <span className='font-sans font-bold'>nome</span>
              </div>
              <div className='flex justify-start items-center h-full ml-3 mr-3 w-2/3'>
                <span className='font-sans font-bold'>acessos</span>
              </div>

              <div className='flex justify-end'>
                <input
                  className='w-30 bg-lime-400 my-1 rounded-2xl pl-1 absolute'
                  type='text'
                  placeholder='Nome'
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>

            </div>

            <div className='w-[40px] ml-3' />
          </nav>

          <div className='w-full h-[80%] flex justify-center mt-5'>
            <div className='w-5/6 h-full overflow-auto'>
              {pessoas
                .filter((pessoa) =>
                  pessoa.NOME.toLowerCase().includes(filtro.toLowerCase()) ||
                  pessoa.ID.toString().includes(filtro)
                )
                .map((pessoa) => (
                  <div
                    className='w-full h-10 bg-white rounded-3xl px-6 mt-8'
                    onClick={() => handleOpenPessoa(pessoa.ID)}
                    key={pessoa?.ID}
                  >
                    <div className='flex justify-start items-center h-full mr-3 w-full'>
                      <div className='flex justify-center items-center h-full mr-3 '>
                        <span className='w-[40px] font-sans truncate'>{pessoa.ID}</span>
                      </div>
                      <div className='flex justify-start items-center h-full mr-3 w-1/3'>
                        <span className='font-sans truncate'>{pessoa.NOME}</span>
                      </div>
                      <div className='flex justify-start items-center h-full ml-3 mr-3 w-2/3'>
                        <span className='font-sans truncate'>{pessoa?.SISTEMAS || 'Nenhum sistema cadastrado'}</span>
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

              {pessoaSelecionada !== null && (
                <ModalPessoa
                  onCloseModal={handleClosePessoa}
                  arraySistemaPessoa={arraySistemaPessoa}
                  setArraySistemasPessoa={setArraySistemaPessoa}
                  arraySistemas={arraySistemas}
                  formData={formData}
                  setFormData={setFormData}
                  token={token}
                  setPessoas={setPessoas}
                />
              )}
              {/* 
              {modalButtonRight !== false && (
                <ModalRightButton />
              )} */}
            </div>

            <div className='flex justify-end flex-col ml-3 h-full'>
              <button
                className='w-[40px] h-[40px] bg-lime-400 rounded-full flex items-center justify-center mt-3'
                onClick={() => FetchData.sistemasPorTodasPessoas({ setPessoas, token })}
              >
                <FontAwesomeIcon icon={faRedo} className='text-white' />
              </button>
              <button
                className='w-[40px] h-[40px] bg-lime-400 rounded-full flex items-center justify-center mt-3'
                onClick={handleOpenModalCriaPessoa}
              >
                <span className='text-4xl text-white'>+</span>
              </button>
            </div>
          </div>
        </section>
      </div>

    </BackgroundTN>

  );
}

export default Acessos;
