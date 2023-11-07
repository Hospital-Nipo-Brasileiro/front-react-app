import React from 'react';

function HeaderList() {
  return (
    <div className='w-full bg-white h-9 flex rounded-3xl items-center justify-center'>
        <div className='w-11/12 flex'>
            <span className='text-sm w-56 ml-5 mr-1 font-semibold'>Nome</span>
            <span className='text-sm w-28 mr-1 font-semibold'>Usuário</span>
            <span className='text-sm w-32 mr-1 font-semibold'>Senha</span>
            <span className='text-sm w-16 mr-1 font-semibold'>Local</span>
            <span className='text-sm w-64 mr-1 font-semibold'>Departamento</span>
            <span className='text-sm w-64 mr-1 font-semibold'>Acessos</span>
        </div>
    </div>
  );
}

export default HeaderList;