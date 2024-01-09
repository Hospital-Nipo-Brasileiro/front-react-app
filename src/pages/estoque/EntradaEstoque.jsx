import axios from 'axios';
import React, { useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import CustomButton from '../../components/CustomButton';
import './StyleEntradaEstoque.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../components/Input';
import BackgroundTN from '../../components/BackgroundTN';

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
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(response.data.error, {
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
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
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
    <BackgroundTN>
      <NavBarUser screenPath="/estoques/central" />
      <div className="container-searcher">
        <div className="container-items">
          <div className="container-content-items">
            <Input type='text' placeholder='nome' value={nome} onChange={handleNomeChange} />
            <Input type='text' placeholder='modelo' value={modelo} onChange={handleModeloChange} />
            <Input type='text' placeholder='descrição' value={descricao} onChange={handleDescricaoChange} />
            <CustomButton onclick={handleCriaItem} text='Dar entrada' />
          </div>
        </div>
      </div>
    </BackgroundTN>

  );
}

export default EntradaEstoque;
