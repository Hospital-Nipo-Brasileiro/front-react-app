import React, { useEffect, useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import './StyleEstoqueTemp.css';
import lupa from '../../assets/lupa.svg'
import { useLocation } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input'

function Estoque() {
  const [itens, setItens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axios
      .get(`http://10.10.204.54:8080/estoques/${id}/itens`)
      .then((response) => {
        setItens(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, [id]);

  const filteredItens = itens.filter((item) => {
    const zonaNome = item.ZONA || '';
    const bauZonaNome = item.BAU || '';
    const armarioNome = item.ARMARIO || '';
    const prateleiraNome = item.PRATELEIRA || '';
    const itemNome = item.ITEM || '';

    const searchTerm = searchQuery.toLowerCase();

    return (
      zonaNome.toLowerCase().includes(searchTerm) ||
      bauZonaNome.toLowerCase().includes(searchTerm) ||
      armarioNome.toLowerCase().includes(searchTerm) ||
      prateleiraNome.toLowerCase().includes(searchTerm) ||
      itemNome.toLowerCase().includes(searchTerm)
    );
  });

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setIsEditing(false)
    setSelectedItem(null);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSave = async () => {
    try {
      const body = {
        ds_nome: selectedItem?.ITEM,
        ds_modelo: selectedItem?.BAU,
        ds_item: selectedItem?.ESTOQUE,
      };

      await axios.put(`http://10.10.204.54:8080/itens/${selectedItem.id}`, body);
      // setItens(updatedItems);
      toggleEdit();
    } catch (error) {
      console.error('Erro ao atualizar o item:', error);
    }
  };

  return (
    <div className="login-background">
      <span className='title-technipo'>ESTOQUE</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser />

        <section className="w-5/6 h-5/6 rounded-3xl bg-black/50 m-12">
          <nav className="w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center">
            <div className="w-[65vw] flex">
              <div className="w-8/12 flex justify-start">
                <div className="container-item" id="item-id">
                  <span className='span-items'>id</span>
                </div>
                <div className="container-item" id='item-estoque'>
                  <span className='span-items'>estoque</span>
                </div>
                <div className="container-item" id='item-zona'>
                  <span className='span-items'>zona</span>
                </div>
                <div className="container-item" id='item-armario'>
                  <span className='span-items'>armário</span>
                </div>
                <div className="container-item" id='item-prateleira'>
                  <span className='span-items'>prateleira</span>
                </div>
                <div className="container-item" id='item-bau'>
                  <span className='span-items'>baú</span>
                </div>
                <div className="container-item" id='span-item-item'>
                  <span className='span-items'>item</span>
                </div>
              </div>
              <input
                className="search-bar"
                type="text"
                placeholder="  ex.: fone de ouvido"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="container-item" id='item-quantidade-item'>
                <span className='span-items'>qnt</span>
              </div>
            </div>
          </nav>
          <div className="container-items">
            <div className="w-5/6 h-5/6 flex flex-col justify-start overflow-y-auto max-h-96">
              {filteredItens.map((item) => (
                <div
                  className="bg-white shadow-xl rounded-3xl flex h-10 mb-5 w-full border-0"
                  onClick={() => openModal(item)}
                  key={item.id}
                >
                  <div className="container-item" id="item-id">
                    <span className='span-items'>{item.id}</span>

                  </div>
                  <div className="container-item" id='item-estoque'>
                    <span className='span-items'>{item.ESTOQUE ?? "-"}</span>
                  </div>
                  <div className="container-item" id='item-zona'>
                    <span className='span-items'>{item.ZONA ?? "-"}</span>
                  </div>
                  <div className="container-item" id='item-armario'>
                    <span className='span-items'>{item.ARMARIO ?? "-"}</span>
                  </div>
                  <div className="container-item" id='item-prateleira'>
                    <span className='span-items'>{item.PRATELEIRA ?? "-"}</span>
                  </div>
                  <div className="container-item" id='item-bau'>
                    <span className='span-items'>{item.BAU ?? "-"}</span>
                  </div>
                  <div className="container-item" id='item-item'>
                    <span className='span-items'>{item.ITEM ?? "-"}</span>
                  </div>

                  <div className="container-item" id="item-quantidade-item">
                    <span className='span-items'>{item.QT_ITEM ?? "-"}</span>
                  </div>
                </div>
              ))}

              {selectedItem && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                  <div className="absolute w-1/2 bg-white rounded-lg p-8 flex flex-col">
                    <span>ID: {selectedItem.id}</span>
                    {isEditing ? (
                      <div className='flex flex-col'>
                        <Input
                          label="Item"
                          value={selectedItem?.ITEM || ""}
                          onChange={(e) => {
                            setSelectedItem({
                              ...selectedItem,
                              ITEM: e.target.value
                            })
                          }}
                        />

                        <Input
                          label="Modelo"
                          value={selectedItem?.MODELO || ""}
                          onChange={(e) => {
                            setSelectedItem({
                              ...selectedItem,
                              MODELO: e.target.value
                            })
                          }}
                        />

                        <Input
                          label="Descrição"
                          value={selectedItem?.DESCRICAO || ""}
                          onChange={(e) => {
                            setSelectedItem({
                              ...selectedItem,
                              DESCRICAO: e.target.value
                            })
                          }}
                        />
                      </div>
                    ) : (
                      <div className='flex flex-col'>
                        <span>Item: {selectedItem.ITEM || "-"}</span>
                        <span>Modelo: {selectedItem.MODELO || "-"}</span>
                        <span>Descrição: {selectedItem.DESCRICAO || "-"}</span>
                      </div>
                    )}
                    <div className='flex w-full justify-end'>
                      {isEditing ? (
                        <>
                          <CustomButton onclick={onSave} text='Salvar' />
                          <CustomButton onclick={toggleEdit} text='Cancelar' />
                        </>
                      ) : (
                        <>
                          <CustomButton onclick={toggleEdit} text='Editar' />
                          <CustomButton text='Deletar' />
                        </>
                      )}

                      <CustomButton onclick={closeModal} text='Fechar' />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <CustomButton sendTo={"/estoques/entrada"} text='Dar entrada' />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Estoque;
