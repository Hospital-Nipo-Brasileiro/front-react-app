import React, { useEffect, useState } from 'react';
import BackgroundTN from '../../components/BackgroundTN';
import NavBarUser from '../../components/NavBarUser';
import { Service } from '../../services/Service';
import { toast } from 'react-toastify';
import ModalCriaLogin from './ModalCriaLogin';

function Admin() {
  const [logins, setLogins] = useState([]);
  const [modalLogin, setModalLogin] = useState(false);
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
  const [arrayPessoas, setArrayPessoas] = useState([]);

  const token = sessionStorage.getItem('token');

  const toastConfig = {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const fetchData = async () => {
    try {
      await Service.get('/login', (error, data) => {
        if(error) {
          toast.error(error, toastConfig)
        } else {
          setLogins(data.data);
        }
      }, token);
    } catch (error) {
      toast.error(error, toastConfig);
    }
  };

  const handleOpenCriaLogin = async () => {
    try {
      await Service.get('/pessoas', (error, data) => {
        if(error) {
          console.error(error, toastConfig);
        } else {
          setArrayPessoas(data.data);
        }
      }, token);
    } catch (error) {
      console.error(error, toastConfig);
    }
    setModalLogin(true);
  };

  const handleCloseCriaLogin = () => {
    setModalLogin(false);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <BackgroundTN title='ADMIN' customStyledApp={'flex flex-col items-center'}>
      <NavBarUser backbtn={true} />

      <div className='w-full h-full flex justify-center items-center'>
        <section className='w-5/6 h-5/6 rounded-3xl bg-black/50 flex flex-col items-center'>
          <nav className='w-full h-16 2xl:h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center px-6'>
            <div className='w-10/12 flex justify-start'>
              <div className='flex justify-center items-center h-full mr-3 '>
                <span className='w-[40px] font-sans font-bold'>id</span>
              </div>
              <div className='flex justify-start items-center h-full mr-3 w-full'>
                <span className='font-sans font-bold'>nome</span>
              </div>

              <div className='flex justify-end'>
                <input 
                  className='w-30 bg-lime-400 my-0 2xl:my-1 rounded-2xl pl-1 absolute' 
                  type='text'
                  placeholder='Nome'
                />
              </div>
            </div>
            <div className='w-[40px] ml-3'/>
          </nav>

          <div className='w-full h-full flex justify-center mt-5'>
            <div className='w-5/6 h-5/6 overflow-auto'>
              {logins?.map((login) => (
                <div 
                className='w-full h-10 bg-white rounded-3xl px-6 mt-8'
                key={login?.id}
                >
                  <div className='flex justify-start items-center h-full mr-3 w-full'>
                    <div className='flex justify-center items-center h-full mr-3 '>
                      <span className='w-[40px] font-sans truncate'>{login?.id}</span>
                    </div>
                    <div className='flex justify-start items-center h-full mr-3 w-1/3'>
                      <span className='font-sans truncate'>{login?.ds_username}</span>
                    </div>
                  </div>
                </div> 
              ))}
            </div>

            {modalLogin && (
              <ModalCriaLogin 
                onCloseModal={handleCloseCriaLogin}
                formData={formData}
                setFormData={setFormData}
                arrayPessoas={arrayPessoas}
                token={token}
              />
            )}

            <div className='flex justify-end flex-col ml-3 h-5/6'>
              <button
                className='w-[40px] h-[40px] bg-lime-400 rounded-full flex items-center justify-center mt-3'
                onClick={handleOpenCriaLogin}
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

export default Admin;