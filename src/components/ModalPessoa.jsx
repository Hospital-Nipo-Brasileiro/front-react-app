import React from 'react';

function ModalPessoa({ onCloseModal }) {
  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">


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