import React from 'react';
import Input from './Input.jsx';
import Select from './Select/Select.jsx';
import MultiSelect from './SelectIcon/MultiSelect.tsx';
import { FormatacaoDeAcessos } from '../services/FormatacaoDeUsuario.js';
import { toast } from 'react-toastify';
import { useState } from 'react';

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
      resetFormData();
    }
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      cpf: "",
      dataAdmissao: "",
      dataNascimento: "",
      tipoContrato: "",
      categoria: "",
      sistemas: [],
    });
  };

  const setUsuario = async () => {
    let localCode = ""
    let tipoContratoCode = ""

    const localCodeRecebido = await FormatacaoDeAcessos.formatarLocal(formData.local, localCode);
    
    const tipoContratoRecebido = await FormatacaoDeAcessos.formatarTipoContrato(formData.tipoContrato, tipoContratoCode);
    const cpfUser = await FormatacaoDeAcessos.formatarCPFUsuario(formData.cpf)

    const usuarioFormatado = `${localCodeRecebido}${tipoContratoRecebido}${cpfUser}`;

    return usuarioFormatado
  }

  const setSenha = async () => {
    let localCode = ""

    const localSenhaRecebida = await FormatacaoDeAcessos.formatarLocalSenha(formData.local, localCode);
    const cpfPassword = await FormatacaoDeAcessos.formatarCPFSenha(formData.cpf)
    const dataAdmissao = await FormatacaoDeAcessos.formatarDataAdmissao(formData.dataAdmissao)

    const senhaFormatada = `${localSenhaRecebida}@${cpfPassword}*${dataAdmissao}`;

    return senhaFormatada;
  }

  const validaCamposDeAcessos = () => {
    let acessoExistente = false;
    let acessoPendente = [];
  
    if (formData.local === "") {
      acessoPendente.push("local");
    }
    if(formData.cpf === ""){
      acessoPendente.push("cpf")
    }
    if(formData.dataAdmissao === "") {
      acessoPendente.push("dataAdmissao")
    }
    if(formData.tipoContrato === "") {
      acessoPendente.push("tipoContrato")
    }
    if(acessoPendente.length === 0) {
      acessoExistente = true;
      return acessoExistente
    }

    return acessoPendente;
  }

  const handleSetAcessos = async () => {
    const camposNecessarios = validaCamposDeAcessos();

    if(camposNecessarios !== true) {
      return toast.error("Necessário inserir os devidos acessos acessos", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const usuarioFormatado = await setUsuario();
    const senhaFormatada = await setSenha();
    
    setFormData({
      ...formData,
      usuario: usuarioFormatado,
      senha: senhaFormatada,
    });
  };

  const validaAcessosSetados = () => {
    let acessoExistente = false;
    if(formData.usuario !== undefined && formData.senha !== undefined) {
      acessoExistente = true;
    }

    return acessoExistente
  }

  const handleSave = () => {
    const acessosExistentes = validaAcessosSetados()

    if(acessosExistentes === false) {
      return toast.error("Necessário setar acessos", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else{
      createPessoa();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">

        <div className='w-full flex justify-between'>
          <div className="w-2/6 mb-3 mr-3">
          <Select
            label={"Local"}
            options={[
              { label: 'HNB', value: 'HNB' },
              { label: 'CMD', value: 'CMD' },
              { label: 'SMA', value: 'SMA' },
            ]}
            onSelect={(response) => {
              handleInputChange("local", response);
            }}
          />

          </div>
          <button 
            className='w-2/6 h-8 bg-orange-400 rounded-xl mt-5'
            onClick={handleSetAcessos}
          >
            <span className='text-white'>setar acessos</span>
          </button>
        </div>

        <div className='flex flex-row h-20 justify-between'>
          <Input
            label={"Nome"}
            value={formData.name}
            divStyled={"w-3/6 mr-3"}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder='ex.: Gustavo Fonseca'
            type='text'
          />

          <Input
            label={"CPF"}
            value={formData.cpf}
            divStyled={"w-3/6 ml-3"}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            placeholder='ex.: 12345678911'
            type='text'
          />
        </div>

        <div className='flex flex-row h-20 justify-between'>  
          <Input
            label={"Data de Admissão"}
            value={formData.dataAdmissao}
            divStyled={"w-3/6 mr-3"}
            onChange={(e) => handleInputChange("dataAdmissao", e.target.value)}
            type='date'
          />

          <Input
            label={"Data de Nascimento"}
            value={formData.dataNascimento}
            divStyled={"w-3/6 ml-3"}
            onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
            type='date'
          />
        </div>

        <div className='flex flex-row h-20 justify-between'>
          
          <div className='w-3/6 mr-3 flex flex-col'>
            <Select
              label={"Tipo de Contrato"}
              options={[
                { label: 'CLT', value: 'CLT' },
                { label: 'TEMPORÁRIO', value: 'Temporário' },
                { label: 'TERCEIRO', value: 'Terceiro' },
              ]}
              onSelect={(response) => {
                handleInputChange("tipoContrato", response);
              }}
            />
          </div>

          <div className='w-3/6 ml-3 flex flex-col'>
            <Select
              label={"Categoria de Cargo"}
              options={[
                { label: 'Assitencial', value: 'Assitencial' },
                { label: 'Administrativo', value: 'TemporárioAdministrativo' }
              ]}
              onSelect={(response) => {
                handleInputChange("tipoContrato", response);
              }}
            />
          </div>

          {/* <Input
            label={"Tipo de Contrato"}
            value={formData.tipoContrato}
            divStyled={"w-3/6 mr-3"}
            onChange={(e) => handleInputChange("tipoContrato", e.target.value)}
            placeholder='ex.: CLT'
            type='text'
          /> */}

          {/* <Input
            label={"Categoria de Cargo"}
            value={formData.categoria}
            divStyled={"w-3/6 ml-3"}
            onChange={(e) => handleInputChange("categoria", e.target.value)}
            placeholder='ex.: Assistencial'
            type='text'
          /> */}
        </div>

        <div className='flex flex-row h-20 justify-between'>
          <Input
            label={"Usuário"}
            value={formData.usuario}
            divStyled={"w-3/6 mr-3"}
            type='text'
            disabled={true}
          />

          <Input
            label={"Senha"}
            value={formData.senha}
            divStyled={"w-3/6 ml-3"}
            type='text'
            disabled={true}
          />
        </div>

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
