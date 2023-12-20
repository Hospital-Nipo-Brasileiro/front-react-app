import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './StylesLogin.css'
import logo from '../../assets/logotype.svg'
import hnipo from '../../assets/hnipo.svg'
import { useAuth } from '../../contexts/AuthContext';
import { signIn } from '../../hooks/signIn';
import BackgroundTN from '../../components/BackgroundTN';
import CustomButton from '../../components/CustomButton';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        toast.error(`Nenhum usuário inserido`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } else if (!password || password === undefined) {
        toast.error(`Senha não inserida`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      const token = await signIn({ username, password });
      if (token) {
        login();

        await toast.success('Login bem-sucedido!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } catch (error) {
      toast.error("Falha ao fazer login. Verifique suas credenciais.");
    }
  };


  return (
    <BackgroundTN title={"LOGIN"}>
      <div className="flex justify-between">

        <div className="hidden md:flex flex-row">
          <img
            src={logo}
            alt="logotipo"
            className='
              mt-5 ml-5
              md:w-full
              w-10  
            '/>
        </div>

        {/* RESPONSIVIDADE PARA CELULAR */}
        <div className="mt-3 mb-20 mx-12 md:hidden flex flex-col items-center">
          <div className="w-full">
            <label
              className='font-sans font-semibold text-base'
            >
              username:
            </label>
            <input
              type='text'
              className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ boxShadow: '4px 7px 10px 0px rgba(0, 0, 0, 0.50)' }}
            />
          </div>

          <div className="w-full">
            <label
              className='font-sans font-semibold text-base'
            >
              password:
            </label>
            <input
              type='password'
              className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <span className='copyright-span'>All rights reseved by TechNipo©2023. Created by Gustavo Fonseca</span>



        {/* RESPONSIVIDADE PARA COMPUTADOR */}
        <div className="absolute w-[30%] h-[83.5%] bg-white flex flex-col rounded-t-xl justify-between align-center shadow-2xl shadow-black top-[16.5%] left-[33.333%]">
          <img src={hnipo} alt='' className='w-full' />
          <div className="mt-3 mb-20 mx-12 flex flex-col items-center">
            <div className="w-full">
              <label
                className='font-sans font-semibold text-base'
              >
                username:
              </label>
              <input
                type='text'
                className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ boxShadow: '4px 7px 10px 0px rgba(0, 0, 0, 0.50)' }}
              />
            </div>

            <div className="w-full">
              <label
                className='font-sans font-semibold text-base'
              >
                password:
              </label>
              <input
                type='password'
                className='bg-[#d9d9d9] border-0 w-full rounded-lg my-3 focus-visible:outline-none shadow-black shadow-2xl px-2'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <span className='copyright-span'>All rights reseved by TechNipo©2023. Created by Gustavo Fonseca</span>
        </div>
      </div>
    </BackgroundTN>
  );
}

export default Login;