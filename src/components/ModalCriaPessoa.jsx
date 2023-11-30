import React from 'react';
import Input from './Input';

function ModalCriaPessoas(
  { 
    onCloseModal,
    valueName, 
    setValueName, 
    valueCpf, 
    setValueCpf,
    valueDtAdmissao,
    setDtAdmissao, 
    valueDtNascimento, 
    setDtNascimento,
    valueContrato, 
    setContrato,
    valueCategoria, 
    setCategoria,
    valueArraySistemas,
    valueSistemas,
    setSistemas
  }
) {
  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  }

  const handleSave = () => {
    console.log(`
      Nome: ${valueName}
      Cpf: ${valueCpf}
      `)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <Input
          label={"Nome"}
          value={valueName}
          onChange={(e) =>  setValueName(e.target.value)}
          placeholder=''
          type='text'
        />

        <Input
          label={"CPF"}
          value={valueCpf}
          onChange={(e) => {setValueCpf(e.target.value)}}
          placeholder=''
          type='text'
        />

        <Input
          label={"Data de Admissão"}
          value={valueDtAdmissao}
          onChange={(e) => {setDtAdmissao(e.target.value)}}
          placeholder=''
          type='date'
        />

        <Input
          label={"Data de Nascimento"}
          value={valueDtNascimento}
          onChange={(e) => {setDtNascimento(e.target.value)}}
          placeholder=''
          type='date'
        />

        <Input
          label={"Tipo de Contrato"}
          value={valueContrato}
          onChange={(e) => {setContrato(e.target.value)}}
          placeholder=''
          type='text'
        />

        <Input
          label={"Categoria de Cargo"}
          value={valueCategoria}
          onChange={(e) => {setCategoria(e.target.value)}}
          placeholder=''
          type='text'
        />

        <div>
          <label className="text-orange-500">Sistemas</label>
          <div className='flex '>
            {valueArraySistemas.map((sistema) => (
              <div key={sistema.id} className="flex items-center mr-10">
                <input
                  type="checkbox"
                  id={sistema.id}
                  value={sistema.id}
                  checked={valueSistemas.includes(sistema.id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSistemas((prevSistemas) => {
                      if (isChecked) {
                        return [...prevSistemas, sistema.id];
                      } else {
                        return prevSistemas.filter((id) => id !== sistema.id);
                      }
                    });
                  }}
                />
                <label htmlFor={sistema.id} className="ml-2">{sistema.ds_nome}</label>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-row justify-end mt-10'>
          <button
            className='bg-orange-500 w-1/5 mr-10 h-[60px] rounded-2xl'
            onClick={handleCloseModal}
          >
            <span className='text-white text-xl'>Fechar</span>
          </button>

          <button
            className='bg-orange-500 w-1/5 h-[60px] rounded-2xl'
            onClick={handleSave}
          >
            <span className='text-white text-xl'>Salvar</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default ModalCriaPessoas;