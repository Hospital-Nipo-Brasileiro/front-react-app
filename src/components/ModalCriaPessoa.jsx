import React from 'react';
import Input from './Input';

function ModalCriaPessoas({ onCloseModal, value }) {
  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <Input
          label={"Nome"}
          value={value}
          placeholder=''
          type='text'
        />

        <Input
          label={"CPF"}
          value={value}
          placeholder=''
          type='text'
        />

        <Input
          label={"Data de Admissão"}
          value={value}
          placeholder=''
          type='date'
        />

        <Input
          label={"Data de Nascimento"}
          value={value}
          placeholder=''
          type='date'
        />

        <Input
          label={"Tipo de Contrato"}
          value={value}
          placeholder=''
          type='text'
        />

        <Input
          label={"Categoria de Cargo"}
          value={value}
          placeholder=''
          type='text'
        />

        <Input
          label={"Sistemas"}
          value={value}
          placeholder=''
          type='select'
        />

        <div className='flex flex-row justify-end mt-10'>
          <button
            className='bg-orange-500 w-1/5 mr-10 h-[60px] rounded-2xl'
            onClick={handleCloseModal}
          >
            <span className='text-white text-xl'>Fechar</span>
          </button>

          <button
            className='bg-orange-500 w-1/5 h-[60px] rounded-2xl'
            onClick={""}
          >
            <span className='text-white text-xl'>Salvar</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default ModalCriaPessoas;