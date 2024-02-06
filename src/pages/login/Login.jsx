import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logobranca.png'
import hnipo from '../../assets/hnipo.svg'
import { useAuth } from '../../contexts/AuthContext';
import { signIn } from '../../hooks/signIn';
import BackgroundTN from '../../components/BackgroundTN';
import CustomButton from '../../components/CustomButton';
import { toastConfig } from '../../services/toastConfigService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { auth, login } = useAuth();


  useEffect(() => {
    if (auth) {
      navigate('/home');
    }
  })

  const handleSignIn = async () => {
    try {
      if (!username || username === undefined) {
        toast.error(`Nenhum usuário inserido`, toastConfig);
        return;
      } else if (!password || password === undefined) {
        toast.error(`Senha não inserida`, toastConfig);
        return;
      }
      await signIn({ username, password });
      const token = sessionStorage.getItem('token');
      if (token) {
        login();

        await toast.success('Login bem-sucedido!', toastConfig);
      }

    } catch (error) {
      toast.error('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <BackgroundTN title={'LOGIN'} Height={'h-screen'}>
      <div className='flex flex-col h-full justify-between md:flex-row md:justify-between md:h-auto'>

        <div className='flex flex-row'>
          <img
            src={logo}
            alt='logotipo'
            className='
              mt-5 ml-5
              md:w-40
              w-20    
            '/>
        </div>

        {/* RESPONSIVIDADE PARA CELULAR */}
        <div className='mt-20 mb-20 mx-12 md:hidden flex flex-col items-center'>
          <div className='w-full'>
            <label
              className='font-sans font-semibold text-base'
            >
              username:
            </label>
            <input
              type='text'
              className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{ boxShadow: '4px 7px 10px 0px rgba(0, 0, 0, 0.50)' }}
            />
          </div>

          <div className='w-full'>
            <label
              className='font-sans font-semibold text-base'
            >
              password:
            </label>
            <input
              type='password'
              className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              style={{ boxShadow: '4px 7px 10px 0px rgba(0, 0, 0, 0.50)' }}
            />
          </div>

          <div className='w-full 2xl:px-32 xl:px-20 mt-8'>
            <CustomButton
              onclick={handleSignIn}
              bgDefault={false}
              bgColor={'bg-white font-bold'}
              text='Login'
              textColor={'text-emerald-400'}
            />
          </div>


        </div>

        <div className='md:hidden flex items-center justify-center w-full'>
          <span
            className='
                text-zinc-700 m-5
                text-xs
                sm:text-sm
              '
          >
            All rights reseved by TechNipo©2023. Created by Gustavo Fonseca
          </span>
        </div>



        {/* RESPONSIVIDADE PARA COMPUTADOR */}
        <div
          className='
            hidden 
            md:absolute md:w-[45%] md:h-[83.5%] md:bg-white md:flex md:flex-col md:rounded-t-xl md:justify-between md:align-center md:shadow-2xl md:shadow-black md:top-[16.5%] md:left-[29.333%]
            xl:w-[30%] xl:left-[33.333%]
            '
        >
          <img src={hnipo} alt='' className='w-full' />
          <div className='mt-3 mb-20 mx-12 flex flex-col items-center'>
            <div className='w-full'>
              <label
                className='font-sans font-semibold text-base'
              >
                username:
              </label>
              <input
                type='text'
                className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{ boxShadow: '4px 7px 10px 0px rgba(0, 0, 0, 0.50)' }}
              />
            </div>

            <div className='w-full'>
              <label
                className='font-sans font-semibold text-base'
              >
                password:
              </label>
              <input
                type='password'
                className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{ boxShadow: '4px 7px 10px 0px rgba(0, 0, 0, 0.50)' }}
              />
            </div>

            <div className='w-full 2xl:px-32 xl:px-20 mt-8'>
              <CustomButton
                onclick={handleSignIn}
                text='Login'
              />
            </div>
          </div>
          <div className='flex items-center justify-center w-full'>
            <span className='text-zinc-700 m-3 text-sm'>All rights reseved by TechNipo©2023. Created by Gustavo Fonseca</span>
          </div>
        </div>
      </div>
    </BackgroundTN>
  );
}

export default Login;