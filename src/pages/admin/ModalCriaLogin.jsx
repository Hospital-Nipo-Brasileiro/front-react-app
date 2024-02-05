import React, { useState } from 'react';
import Input from '../../components/Input';
import Select from '../../components/Select/Select';
import { FormatacaoDeAcessos } from '../../services/formatarUsuarioService';
import { toast } from 'react-toastify';
import AutocompleteInput from '../../components/AutocompleteInput';
import { API } from '../../services/apiService';
import { toastConfig } from '../../services/toastConfigService';

function ModalCriaLogin({
  onCloseModal,
  formData,
  setFormData,
  arrayPessoas,
  setLogins,
  token
}) {
  const [errorStatus, setErrorStatus] = useState([]);

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
      id: '',
      name: '',
      cpf: '',
      dataAdmissao: '',
      dataNascimento: '',
      tipoContrato: '',
      categoria: '',
      pessoaSelecionada: '',
      usuarioPessoaExistente: '',
      senhaPessoaExistente: '',
      cpfPessoaExistente: '',
      dataAdmissaoPessoaExistente: '',
      tipoContratoPessoaExistente: ''
    });
  };

  const setUsuario = async (local, tipoContrato, cpf) => {
    let localCode = ''
    let tipoContratoCode = ''

    const localCodeRecebido = await FormatacaoDeAcessos.formatarLocal(local, localCode);

    const tipoContratoRecebido = await FormatacaoDeAcessos.formatarTipoContrato(tipoContrato, tipoContratoCode);
    const cpfUser = await FormatacaoDeAcessos.formatarCPFUsuario(cpf)

    const usuarioFormatado = `${localCodeRecebido}${tipoContratoRecebido}${cpfUser}`;

    return usuarioFormatado
  }

  const setSenha = async (local, cpf, dataAdmissao) => {
    let localCode = ''

    const localSenhaRecebida = await FormatacaoDeAcessos.formatarLocalSenha(local, localCode);
    const cpfPassword = await FormatacaoDeAcessos.formatarCPFSenha(cpf)
    const dataAdmissaoRecebida = await FormatacaoDeAcessos.formatarDataAdmissao(dataAdmissao)

    const senhaFormatada = `${localSenhaRecebida}@${cpfPassword}*${dataAdmissaoRecebida}`;

    return senhaFormatada;
  }

  const validaCamposDeAcessos = () => {
    let acessoExistente = false;
    let acessoPendente = [];

    const addErrorStatus = (value) => (prevErrorStatus) => {
      return prevErrorStatus ? [...prevErrorStatus, value] : [value];
    };

    if (formData.name === '') {
      setErrorStatus(addErrorStatus('name'));
      acessoPendente.push('name');
    }
    if (formData.cpf === '') {
      setErrorStatus(addErrorStatus('cpf'));
      acessoPendente.push('cpf');
    }
    if (formData.dataAdmissao === '') {
      setErrorStatus(addErrorStatus('dataAdmissao'));
      acessoPendente.push('dataAdmissao');
    }
    if (formData.tipoContrato === '') {
      setErrorStatus(addErrorStatus('tipoContrato'));
      acessoPendente.push('tipoContrato');
    }
    if (formData.categoria === '') {
      setErrorStatus(addErrorStatus('categoria'));
      acessoPendente.push('categoria');
    }
    if (acessoPendente.length === 0) {
      setErrorStatus(null);
      acessoExistente = true;
      return acessoExistente;
    }

    return acessoPendente;
  };

  const validaCamposDeAcessosPessoaExistente = () => {
    let acessoExistente = false;
    let acessoPendente = [];

    const addErrorStatus = (value) => (prevErrorStatus) => {
      return prevErrorStatus ? [...prevErrorStatus, value] : [value];
    };

    if (formData.pessoaSelecionada === '') {
      setErrorStatus(addErrorStatus('pessoaSelecionada'));
    }
    if (acessoPendente.length === 0) {
      setErrorStatus(null);
      acessoExistente = true;
      return acessoExistente;
    }
    return acessoPendente;
  }

  const handleSetAcessos = async () => {
    const camposNecessarios = validaCamposDeAcessos();

    if (camposNecessarios !== true) {
      return toast.error('Necessário inserir os devidos acessos acessos', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    const usuarioFormatado = await setUsuario('HNB', formData.tipoContrato, formData.cpf);
    const senhaFormatada = await setSenha('HNB', formData.cpf, formData.dataAdmissao);

    setFormData({
      ...formData,
      usuario: usuarioFormatado,
      senha: senhaFormatada,
    });
  };

  const handleSetarAcessoPessoaExistente = async () => {
    const camposNecessarios = validaCamposDeAcessosPessoaExistente();

    if (camposNecessarios !== true) {
      return toast.error('Necessário inserir os devidos acessos acessos', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }



    const usuarioFormatado = await setUsuario('HNB', formData.tipoContratoPessoaExistente, formData.cpfPessoaExistente);
    const senhaFormatada = await setSenha('HNB', formData.cpfPessoaExistente, formData.dataAdmissaoPessoaExistente);

    setFormData({
      ...formData,
      usuarioPessoaExistente: usuarioFormatado,
      senhaPessoaExistente: senhaFormatada,
    });
  }

  const validaAcessosSetados = () => {
    let acessoExistente = false;
    if (formData.usuario !== undefined && formData.senha !== undefined) {
      acessoExistente = true;
    }

    return acessoExistente
  }

  const handleCriaNovaPessoaELogin = () => {
    const camposNecessarios = validaCamposDeAcessos();

    if (camposNecessarios !== true) {
      return toast.error('Necessário inserir os devidos acessos acessos', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    const acessosExistentes = validaAcessosSetados()

    if (acessosExistentes === false) {
      return toast.error("Necessário setar acessos", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const body = {
        ds_nome: formData.name,
        nr_cpf: formData.cpf,
        dt_admissao: formData.dataAdmissao,
        dt_nascimento: formData.dataNascimento,
        tp_contrato: formData.tipoContrato,
        ds_categoria_cargo: formData.categoria,
      }

      try {
        API.post("/pessoas", body, (error, data) => {
          if (error) {
            toast.error(error.mensagem.name, toastConfig);
          } else {
            const bodyLogin = {
              id_pessoa: data.data.id,
              ds_username: formData.usuario,
              ds_email: "",
              ds_password: formData.senha
            }

            try {
              API.post("/login/cria", bodyLogin, (err, dataLogin) => {
                if (err && err !== undefined) {
                  toast.error(err, toastConfig);
                } else {
                  toast.success(`USUÁRIO: ${dataLogin.data.ds_username}`, toastConfig);
                  handleCloseCriaLogin();
                  try {
                    API.get('/login', (error, data) => {
                      if (error) {
                        toast.error(error, toastConfig)
                      } else {
                        setLogins(data.data);
                      }
                    }, token);
                  } catch (error) {
                    toast.error(error, toastConfig);
                  }

                }
              }, token)
            } catch (err) {
              toast.error(err, toastConfig);
            }
          }
        }, token)

      } catch (error) {

      }
    }
  }

  const handleCriaLoginEVinculaAPessoa = () => {
    const camposNecessarios = validaCamposDeAcessosPessoaExistente();

    if (camposNecessarios !== true) {
      return toast.error('Necessário inserir os devidos acessos acessos', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    const bodyLogin = {
      id_pessoa: formData.id,
      ds_username: formData.usuarioPessoaExistente,
      ds_password: formData.senhaPessoaExistente
    }

    try {
      API.post("/login/cria", bodyLogin, (err, data) => {
        if (err) {
          console.error(err.mensagem)
          toast.error(err.mensagem.name, toastConfig);
        } else {
          if (data.status === 200 || data.status === 201) {
            toast.success(`USUÁRIO: ${data.data.ds_username}`, toastConfig);
            handleCloseCriaLogin();
            try {
              API.get('/login', (error, dataGet) => {
                if (error) {
                  toast.error(error, toastConfig)
                } else {
                  setLogins(dataGet.data);
                }
              }, token);
            } catch (error) {
              console.error(error)
              toast.error(error.mensagem, toastConfig);
            }
          } else {
            toast.error(data.data, toastConfig);
          }
        }
      }, token)
    } catch (err) {
      console.error(err)
      toast.error(err.mensagem, toastConfig);
    }
  }

  return (
    <div className='fixed top-8 bg-black bg-opacity-60 left-0 w-full h-full flex items-center justify-center z-50'>
      <div className='absolute w-2/3 h-4/6 bg-white rounded-lg p-8 flex flex-col'>
        <div className='flex flex-row w-full h-full'>
          <div className='w-1/2 h-5/6 pr-8'>
            {/* <div className='w-1/2 h-5/6 bg-zinc-500 bg-opacity-80 absolute top-0 left-0 z-50 rounded-lg flex justify-center items-center'>
              <h3 className='text-lime-500 block font-bold  text-3xl'>Criar nova pessoa e login</h3>
            </div>
            <div className='w-1/2 h-5/6 bg-black bg-opacity-50 absolute top-0 left-1/2 z-50 rounded-lg'/> */}
            <h3 className='text-lime-500 block font-bold mb-5'>Criar nova pessoa e login</h3>

            <div className='flex flex-row'>
              <Input
                label={'Nome'}
                placeholder='Digite o nome'
                value={formData.name}
                customStyled={`${errorStatus?.includes('name') ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange('name', e.target.value)}
                divStyled={'mr-2'}
              />

              <Input
                label={'CPF'}
                placeholder='Digite o cpf'
                divStyled={'ml-2'}
                value={formData.cpf}
                customStyled={`${errorStatus?.includes('cpf') ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
              />
            </div>

            <div className='flex flex-row'>
              <Input
                label={'Data de admissão'}
                type='date'
                divStyled={'mr-2'}
                value={formData.dataAdmissao}
                customStyled={`${errorStatus?.includes('dataAdmissao') ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange('dataAdmissao', e.target.value)}
              />

              <Input
                label={'Data de nascimento'}
                type='date'
                divStyled={'ml-2'}
                value={formData.dataNascimento}
                customStyled={`${errorStatus?.includes('dataNascimento') ? 'border-red-600 bg-red-100' : ''}`}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}

              />
            </div>

            <div className='w-full flex flex-row justify-between'>
              <div className='w-full mr-2'>
                <Select
                  label={'Tipo de Contrato'}
                  options={[
                    { label: 'CLT', value: 'CLT' },
                    { label: 'TEMPORÁRIO', value: 'Temporário' },
                    { label: 'TERCEIRO', value: 'Terceiro' },
                  ]}
                  onSelect={(response) => {
                    handleInputChange('tipoContrato', response);
                  }}
                  divStyle={`${errorStatus?.includes('tipoContrato') ? 'border-red-600 bg-red-100' : ''}`}
                />
              </div>

              <div className='w-full ml-2'>
                <Select
                  label={'Categoria de Cargo'}
                  options={[
                    { label: 'Assistencial', value: 'Assistencial' },
                    { label: 'Administrativo', value: 'Administrativo' },
                    { label: '', value: '' }
                  ]}
                  onSelect={(response) => {
                    handleInputChange('categoria', response);
                  }}
                  divStyle={`${errorStatus?.includes('categoria') ? 'border-red-600 bg-red-100' : ''}`}
                />
              </div>
            </div>

            <div className='flex flex-row justify-between mt-3'>
              <Input
                label={'Usuário'}
                customStyled={`${errorStatus?.includes('usuario') ? 'border-red-600 bg-red-100' : ''}`}
                value={formData.usuario}
                divStyled={'w-3/6 mr-3'}
                type='text'
                disabled={true}
                placeholder='Clique em setar acessos'
              />

              <Input
                label={'Senha'}
                value={formData.senha}
                divStyled={'w-3/6 ml-3'}
                customStyled={`${errorStatus?.includes('senha') ? 'border-red-600 bg-red-100' : ''}`}
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
                onClick={handleCriaNovaPessoaELogin}
              >
                <span className='text-white text-xl'>Salvar</span>
              </button>
            </div>
          </div>
          <div className='w-[1px] h-full bg-zinc-500' />
          <div className='w-1/2 h-5/6 pl-8'>
            <h3 className='text-lime-500 block font-bold mb-5'>Criar login e vincular à uma pessoa</h3>

            <div>
              <AutocompleteInput
                type='text'
                label='Selecione a pessoa para vincular'
                placeholder='ex.: fulano'
                suggestions={arrayPessoas}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            <div className='flex flex-row justify-between mt-3'>
              <Input
                label={'Usuário'}
                customStyled={`${errorStatus?.includes('usuario') ? 'border-red-600 bg-red-100' : ''}`}
                value={formData.usuarioPessoaExistente}
                divStyled={'w-3/6 mr-3'}
                type='text'
                disabled={true}
                placeholder='Clique em setar acessos'
              />

              <Input
                label={'Senha'}
                value={formData.senhaPessoaExistente}
                divStyled={'w-3/6 ml-3'}
                customStyled={`${errorStatus?.includes('senha') ? 'border-red-600 bg-red-100' : ''}`}
                type='text'
                disabled={true}
                placeholder='Clique em setar acessos'
              />
            </div>

            <div className='w-full flex flex-row justify-between'>
              <button
                className='w-1/2 h-8 bg-lime-600 rounded-xl mt-5 mr-2'
                onClick={handleSetarAcessoPessoaExistente}
              >
                <span className='text-white text-xl'>Setar acessos</span>
              </button>

              <button
                className='bg-lime-400 w-1/2 h-8 mt-5 ml-2 rounded-xl'
                onClick={handleCriaLoginEVinculaAPessoa}
              >
                <span className='text-white text-xl'>Salvar</span>
              </button>
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