import { toast } from "react-toastify";
import { API } from "./apiService";
import { toastConfig } from "./toastConfigService";

export class FetchData {
  static async sistemas({ setArraySistemas, token }) {
    await API.get('/sistemas', (err, data) => {
      try {
        if (err) {
          toast.error(err.mensagem, toastConfig)
        } else {
          setArraySistemas(data.data)
        }
      } catch (err) {
        toast.error(err, toastConfig)
      }
    }, token)
  }

  static async sistemasPorTodasPessoas({ setPessoas, token }) {
    try {
      await API.get('/sistemas-pessoas/filtra', (err, data) => {
        if (err) {
          toast.error(err.mensagem, toastConfig)
        } else {
          setPessoas(data.data[0]);
        }
      }, token)
    } catch (err) {
      toast.error(err, toastConfig)
    }
  }

  static async sistemasPorIdPessoa({ idPessoa, setPessoaSelecionada, setArraySistemasPorPessoa, token }) {
    try {
      await API.get(`/sistemas-pessoas/${idPessoa}/filtra`, (err, data) => {
        if (err) {
          toast.error(err.mensagem, toastConfig)
        } else {
          if(setPessoaSelecionada){
            setPessoaSelecionada(idPessoa);
          }
          setArraySistemasPorPessoa(data.data)
          console.log(data.data)
        }
      }, token)
    } catch (err) {
      toast.error(err, toastConfig)
    }
  }
}