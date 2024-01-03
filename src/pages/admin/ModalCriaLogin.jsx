import React, { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select/Select';
import { FormatacaoDeAcessos } from '../../services/FormatacaoDeUsuario';
import { toast } from 'react-toastify';
import Autosuggest from 'react-autosuggest';
import { Service } from '../../services/Service';

function ModalCriaLogin({
  onCloseModal,
  formData,
  setFormData,
  arrayPessoas,
  token
}) {
  const [errorStatus, setErrorStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCloseCriaLogin = () => {
    if (onCloseModal) {
      setErrorStatus([])
      onCloseModal();
      resetFormData();
    }
  }

  const resetFormData = () => {
    setFormData({
      name: "",
      cpf: "",
      dataAdmissao: "",
      dataNascimento: "",
      tipoContrato: "",
      categoria: "",
    });
  };

  const setUsuario = async () => {
    let localCode = ""
    let tipoContratoCode = ""

    const localCodeRecebido = await FormatacaoDeAcessos.formatarLocal("HNB", localCode);
    
    const tipoContratoRecebido = await FormatacaoDeAcessos.formatarTipoContrato(formData.tipoContrato, tipoContratoCode);
    const cpfUser = await FormatacaoDeAcessos.formatarCPFUsuario(formData.cpf)

    const usuarioFormatado = `${localCodeRecebido}${tipoContratoRecebido}${cpfUser}`;

    return usuarioFormatado
  }

  const setSenha = async () => {
    let localCode = ""

    const localSenhaRecebida = await FormatacaoDeAcessos.formatarLocalSenha("HNB", localCode);
    const cpfPassword = await FormatacaoDeAcessos.formatarCPFSenha(formData.cpf)
    const dataAdmissao = await FormatacaoDeAcessos.formatarDataAdmissao(formData.dataAdmissao)

    const senhaFormatada = `${localSenhaRecebida}@${cpfPassword}*${dataAdmissao}`;

    return senhaFormatada;
  }

  const validaCamposDeAcessos = () => {
    let acessoExistente = false;
    let acessoPendente = [];
  
    const addErrorStatus = (value) => (prevErrorStatus) => {
      return prevErrorStatus ? [...prevErrorStatus, value] : [value];
    };
    
    console.log("entrei")
    if (formData.name === "") {
      setErrorStatus(addErrorStatus("name"));
      acessoPendente.push("name");
      console.log("acesso pendente", acessoPendente)
    }
    if (formData.cpf === "") {
      setErrorStatus(addErrorStatus("cpf"));
      acessoPendente.push("cpf");
      console.log("cpf")
    }
    if (formData.dataAdmissao === "") {
      setErrorStatus(addErrorStatus("dataAdmissao"));
      acessoPendente.push("dataAdmissao");
    }
    if (formData.tipoContrato === "") {
      setErrorStatus(addErrorStatus("tipoContrato"));
      acessoPendente.push("tipoContrato");
    }
    if (formData.categoria === "") {
      setErrorStatus(addErrorStatus("categoria"));
      acessoPendente.push("categoria");
    }
    if (acessoPendente.length === 0) {
      setErrorStatus(null);
      acessoExistente = true;
      return acessoExistente;
    }
  
    return acessoPendente;
  };

  const handleSetAcessos = async () => {
    const camposNecessarios = validaCamposDeAcessos();

    console.log(camposNecessarios)
    if(camposNecessarios !== true) {
      console.log("enttrei")
      return toast.error("Necessário inserir os devidos acessos acessos", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
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

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0
      ? []
      : arrayPessoas.filter(pessoa => pessoa.ds_nome.toLowerCase().includes(inputValue));
  };
  
  

  const renderSuggestion = suggestion => <div>{suggestion}</div>;

  const autosuggestProps = {
    suggestions,
    onSuggestionsFetchRequested: ({ value }) => {
      setSuggestions(getSuggestions(value));
    },
    onSuggestionsClearRequested: () => {
      setSuggestions([]);
    },
    getSuggestionValue: suggestion => suggestion.ds_nome, 
    renderSuggestion,
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col">
        <div className='flex flex-row w-full h-full'>
          <div className='w-1/2 h-full p-10'>
            <h3 className="text-lime-500 block font-bold mb-5">Criar nova pessoa e login</h3>

            <div className='flex flex-row'>
              <Input
                label={"Nome"}
                placeholder='Digite o nome'
                value={formData.name}
                customStyled={`${errorStatus?.includes("name") ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange("name", e.target.value)}
                divStyled={"mr-2"}
              />

              <Input
                label={"CPF"}
                placeholder='Digite o cpf'
                divStyled={"ml-2"}
                value={formData.cpf}
                customStyled={`${errorStatus?.includes("cpf") ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
              />
            </div>

            <div className='flex flex-row'>
              <Input
                label={"Data de admissão"}
                type='date'
                divStyled={"mr-2"}
                value={formData.dataAdmissao}
                customStyled={`${errorStatus?.includes("dataAdmissao") ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange("dataAdmissao", e.target.value)}
              />

              <Input
                label={"Data de nascimento"}
                type='date'
                divStyled={"ml-2"}
                value={formData.dataNascimento}
                customStyled={`${errorStatus?.includes("dataNascimento") ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange("dataNascimento", e.target.value)}

              />
            </div>

            <div className='w-full flex flex-row justify-between'>
              <div className='w-full mr-2'>
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
                  divStyle={`${errorStatus?.includes("tipoContrato") ? 'border-red-600 bg-red-100' : ''}`}
                />
              </div>

              <div className='w-full ml-2'>
                <Select
                  label={"Categoria de Cargo"}
                  options={[
                    { label: 'Assistencial', value: 'Assistencial' },
                    { label: 'Administrativo', value: 'Administrativo' },
                    { label: '', value: '' }
                  ]}
                  onSelect={(response) => {
                    handleInputChange("categoria", response);
                  }}
                  divStyle={`${errorStatus?.includes("categoria") ? 'border-red-600 bg-red-100' : ''}`}
                />
              </div>
            </div>

            <div className='flex flex-row justify-between mt-3'>
              <Input
                label={"Usuário"}
                customStyled={`${errorStatus?.includes("usuario") ? 'border-red-600 bg-red-100' : ''}`}
                value={formData.usuario}
                divStyled={"w-3/6 mr-3"}
                type='text'
                disabled={true}
                placeholder='Clique em setar acessos'
              />

              <Input
                label={"Senha"}
                value={formData.senha}
                divStyled={"w-3/6 ml-3"}
                customStyled={`${errorStatus?.includes("senha") ? 'border-red-600 bg-red-100' : ''}`}
                type='text'
                disabled={true}
                placeholder='Clique em setar acessos'
              />
            </div>

            <div className='w-full flex flex-row justify-between'>
              <button 
                className='w-1/2 h-8 bg-lime-600 rounded-xl mt-5 mr-2'
                onClick={handleSetAcessos}
              >
                <span className='text-white text-xl'>Setar acessos</span>
              </button>

              <button
                className='bg-lime-400 w-1/2 h-8 mt-5 ml-2 rounded-xl'
                // onClick={handleSave}
              >
                <span className='text-white text-xl'>Salvar</span>
              </button>
            </div>
          </div>
          <div className='w-[1px] h-full bg-zinc-500' />
          <div className='w-1/2 h-full p-10'>
            <h3 className="text-lime-500 block font-bold mb-5">Criar login e vincular à uma pessoa</h3>

            <div>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  placeholder: 'Digite para pesquisar',
                  value: searchTerm,
                  onChange: (e, { newValue }) => setSearchTerm(newValue),
                }}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <button
            className='bg-lime-900 w-1/5 h-[60px] rounded-2xl'
            onClick={handleCloseCriaLogin}
          >
            <span className='text-white text-xl'>Fechar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCriaLogin;