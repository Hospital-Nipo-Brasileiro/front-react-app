import React, { useEffect, useState } from 'react';
import BackgroundTN from '../../components/BackgroundTN';
import NavBarUser from '../../components/NavBarUser';
import { API } from '../../services/apiService';
import { toast } from 'react-toastify';
import ModalCriaLogin from './ModalCriaLogin';
import ModalLogin from './ModalLogin';
import { toastConfig } from '../../services/toastConfigService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function Admin() {
  const [logins, setLogins] = useState([]);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCriaLogin, setModalCriaLogin] = useState(false);
  const [arrayPessoas, setArrayPessoas] = useState([]);
  const [arrayLogin, setArrayLogin] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [number, setNumber] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cpf: '',
    dataAdmissao: '',
    dataNascimento: '',
    tipoContrato: '',
    categoria: '',
    pessoaSelecionada: '',
    usuarioPessoaExistente: '',
    senhaPessoaExistente: '',
    cpfPessoaExistente: '',
    dataAdmissaoPessoaExistente: '',
    tipoContratoPessoaExistente: ''
  });
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchData();
  })

  const fetchData = async () => {
    await API.get('/login', (error, data) => {
      if (error) {
        toast.error(error.mensagem, toastConfig)
      } else {
        setLogins(data.data[0]);
        console.log(data.data[0])
      }
    }, token);
  }  

  const handleOpenLogin = (loginId) => {
    try {
      API.get(`/login/${loginId}/infos`, (error, data) => {
        if (error) {
          toast.error(error.mensagem, toastConfig)
        } else {
          setArrayLogin(data.data[0]);
          console.log(data.data[0]);
          setModalLogin(true);
        }
      }, token)
    } catch (err) {
      toast.error("Erro ao realizar busca de login", toastConfig)
    }
  }

  const handleCloseLogin = () => {
    setModalLogin(false);
  }

  const handleOpenCriaLogin = async () => {
    try {
      await API.get('/pessoas', (error, data) => {
        if (error) {
          console.error(error, toastConfig);
        } else {
          setArrayPessoas(data.data);
        }
      }, token);
    } catch (error) {
      console.error(error, toastConfig);
    }
    setModalCriaLogin(true);
  };

  const handleCloseCriaLogin = () => {
    setModalCriaLogin(false);
  };

  return (
    <BackgroundTN title='ADMIN' customStyledApp={'flex flex-col items-center'}>
      <NavBarUser backbtn={true} />

      <div className='w-full h-full flex justify-center items-center'>
        <section className='w-5/6 h-5/6 rounded-3xl bg-black/50 flex flex-col items-center'>
          <nav className='w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center px-6'>
            <div className='w-10/12 flex justify-start'>
              <div className='flex justify-center items-center h-full mr-3 '>
                <span className='w-[40px] font-sans font-bold'>  </span>
              </div>
              <div className='flex justify-start items-center h-full mr-3 w-full'>
                <span className='font-sans font-bold'>nome</span>
              </div>

              <div className='flex justify-end'>
                <input
                  className='w-30 bg-lime-400 my-0 2xl:my-1 shadow shadow-black drop-shadow-2xl rounded-2xl pl-1 absolute top-[9.7rem]'
                  type='text'
                  placeholder='Nome'
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </div>
            <div className='w-[40px] ml-3' />
          </nav>

          <div className='w-full h-full flex justify-center mt-5'>
            <div className='w-5/6 h-5/6 overflow-auto'>
              {logins
                .filter(
                  (login) =>
                    login.NOME?.toLowerCase().includes(filterText.toLowerCase()) ||
                    login.ID?.toString().includes(filterText)
                )
                .map((login, index) => (
                  <div
                    className='w-full h-10 bg-white rounded-3xl px-6 mt-8'
                    onClick={() => handleOpenLogin(login?.ID)}
                    key={login?.ID}
                  >
                    <div className='flex justify-start items-center h-full mr-3 w-full'>
                      <div className='flex justify-center items-center h-full mr-3 '>
                        <span className='w-[40px] font-sans truncate'>{index + 1}</span>
                      </div>
                      <div className='flex justify-start items-center h-full mr-3 w-1/3'>
                        <span className='font-sans truncate'>{login?.NOME}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {modalLogin && (
              <ModalLogin
                onCloseModal={handleCloseLogin}
                loginInfos={arrayLogin}
                setLogins={setLogins}
                token={token}
              />
            )}

            {modalCriaLogin && (
              <ModalCriaLogin
                onCloseModal={handleCloseCriaLogin}
                formData={formData}
                setFormData={setFormData}
                arrayPessoas={arrayPessoas}
                setLogins={setLogins}
                token={token}
              />
            )}

            <div className='flex justify-end flex-col ml-3 h-5/6'>
              <button
                className='w-[40px] h-[40px] bg-lime-400 rounded-full flex items-center justify-center mt-3'
                onClick={handleOpenCriaLogin}
              >
                <FontAwesomeIcon icon={faAdd} className='text-white' />
              </button>
            </div>
          </div>
        </section>
      </div>
    </BackgroundTN>
  );
}

export default Admin;