import React from 'react';

function ModalDesativaAcesso({
  onCloseModal,
  handleDesativaAcesso,
  userId
}) {
  return (
    <div className="fixed top-10 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-1/4 bg-white rounded-lg p-8 flex flex-col">
        <h3 className='text-lime-500 block font-bold mb-5 text-lg'>Desativar acesso</h3>

        <div className='w-full flex flex-col justify-between'>
          <span className='text-gray-700'>Tem certeza de deseja desativar este usuário?</span>
          <div className='w-full flex justify-end'>
            <button
              className="bg-lime-400 w-1/5 mr-4 h-[60px] rounded-2xl text-white"
              onClick={handleDesativaAcesso}
            >
              Confirmar
            </button>
            <button
              className="bg-gray-300 w-1/5 h-[60px] rounded-2xl"
              onClick={onCloseModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDesativaAcesso;