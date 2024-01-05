import React from 'react';

import Error404 from '../../assets/404.svg'
import { Link } from 'react-router-dom';

function NaoEncontrado() {
  return (
    <div className='login-background'>
      <div className='app-background flex flex-col items-center justify-center'>
        <img className='w-[500px]' src={Error404} alt='portal error 404' />
        <span className='font-sans text-[#FF5C00] text-6xl'>Página não encontrada</span>
        <div>
            <span className='font-sans text-white text-3xl'>retorne a página inicial, obrigado! </span>
            <Link to='/home'>
                <span className='font-sans text-[#FF5C00] text-3xl'>clique para voltar</span>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default NaoEncontrado;