import axios from 'axios';
import React, { useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import CustomButton from '../../components/CustomButton';
import './StyleEntradaEstoque.css'
import CustomToasty from '../../components/CustomToast';
import { toast } from 'react-toastify';

function EntradaEstoque() {
  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleCriaItem = () => {
    const body = {
      ds_nome: nome,
      ds_modelo: modelo,
      ds_item: descricao
    };

    axios.post("http://localhost:8080/itens", body)
      .then((response) => {
        if (response.status === 200) {
          setNome("");
          setModelo("");
          setDescricao("");
          toast.success("Item criado pronto para ser triado", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(response.statusText, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  }

  const handleModeloChange = (event) => {
    setModelo(event.target.value);
  }

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  }

  return (
    <div className="login-background">
      <span className='title-technipo'>ESTOQUE</span>

      <div id='center-searcher' className="app-background">
        <NavBarUser/>
        <div className="container-searcher">
          <div className="container-items">
            <div className="container-content-items">
              <input className="item-bar2" type='text' placeholder='nome' value={nome} onChange={handleNomeChange}/>
              <input className="item-bar2" type='text' placeholder='modelo' value={modelo} onChange={handleModeloChange}/>
              <input className="item-bar2" type='text' placeholder='descrição' value={descricao} onChange={handleDescricaoChange}/>
              <CustomButton onclick={handleCriaItem} text='Dar entrada'/>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default EntradaEstoque;
