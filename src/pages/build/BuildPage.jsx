import React from 'react';

import build from '../../assets/build.svg'

function BuildPage() {
  return (
    <div className='login-background'>
      <div className='app-background flex flex-col items-center justify-center'>
        <img className='w-[500px]' src={build} alt='construção de site' />
        <span className='font-sans text-white text-6xl'>Página em construção</span>
        <span className='font-sans text-white text-3xl'>retorne a página anterior, obrigado!</span>
      </div>
    </div>
  );
}

export default BuildPage;