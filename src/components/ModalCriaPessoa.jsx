import React from 'react';
import Input from './Input';
import MultiSelect from './SelectIcon/MultiSelect.tsx';

function ModalCriaPessoas({
  onCloseModal,
  formData,
  setFormData,
  arraySistemas,
  createPessoa,
}) {
  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCloseModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
  };

  const handleSave = () => {
    console.log(formData.dataAdmissao)
    createPessoa();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <Input
          label={"Nome"}
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder='ex.: Gustavo Fonseca'
          type='text'
        />

        <Input
          label={"CPF"}
          value={formData.cpf}
          onChange={(e) => handleInputChange("cpf", e.target.value)}
          placeholder='ex.: 12345678911'
          type='text'
        />

        <Input
          label={"Data de Admissão"}
          value={formData.dataAdmissao}
          onChange={(e) => handleInputChange("dataAdmissao", e.target.value)}
          type='date'
        />

        <Input
          label={"Data de Nascimento"}
          value={formData.dataNascimento}
          onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
          type='date'
        />

        <Input
          label={"Tipo de Contrato"}
          value={formData.tipoContrato}
          onChange={(e) => handleInputChange("tipoContrato", e.target.value)}
          placeholder='ex.: CLT'
          type='text'
        />

        <Input
          label={"Categoria de Cargo"}
          value={formData.categoria}
          onChange={(e) => handleInputChange("categoria", e.target.value)}
          placeholder='ex.: Assistencial'
          type='text'
        />

        <div>
          <label className="text-orange-500">Sistemas</label>
          <MultiSelect
            name="sistemas"
            size="normal"
            optionList={arraySistemas.map((sistema) => ({ label: sistema.ds_nome }))}
            value={formData.sistemas}
            valueChange={(newValue) => handleInputChange("sistemas", newValue)}
            placeholder="Selecione os sistemas"
          />
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
