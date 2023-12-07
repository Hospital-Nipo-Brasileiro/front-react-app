import React from 'react';

function ModalPessoa({ onCloseModal, arraySistemaPessoa }) {
  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <div className='w-full h-full mb-10 overflow-auto'>
          {arraySistemaPessoa[0] && arraySistemaPessoa[0].length >= 1 && arraySistemaPessoa[0][0]?.SISTEMA !== null ? (
            arraySistemaPessoa[0].map((acesso) => (
              <div className='w-full h-24 bg-slate-100 rounded-2xl p-3 mt-5' key={acesso?.ID}>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <span className='w-20 text-orange-500 font-bold'>Sistema: </span>
                    <span>{acesso?.SISTEMA}</span>
                  </div>
                  <div className='flex'>
                    <span className='w-20 text-orange-500'>Usuário: </span>
                    <span>{acesso?.USERNAME}</span>
                  </div>
                  <div className='flex'>
                    <span className='w-20 text-orange-500'>Senha: </span>
                    <span>{acesso?.SENHA}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='w-full h-full flex flex-col items-center'>
              <span>Usuário não contem nenhum sistema vinculado.</span>
              <button className='w-36 h-16 bg-orange-500 text-white rounded-2xl mt-10'>
                Adicionar novo sistema
              </button>
            </div>
          )}


      </div>

        <button
          className='bg-orange-500 w-1/5 mr-10 h-[60px] rounded-2xl'
          onClick={handleCloseModal}
        >
          <span className='text-white text-xl'>Fechar</span>
        </button>
        
      </div>
    </div>
  );
}

export default ModalPessoa;
