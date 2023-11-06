import React, { useEffect, useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import './StyleEstoqueTemp.css';
import lupa from '../../assets/lupa.svg'
import ReactModal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';

function Estoque() {
  const [itens, setItens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axios.get(`http://localhost:8080/estoques/${id}/itens`)
      .then((response) => {
        setItens(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, []);

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

  return (
    <div className="login-background" style={{position: modal ? 'fixed' : 'relative'}}>
      <span className='title-technipo'>ESTOQUE</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser />

        <section className="w-5/6 h-5/6 rounded-3xl bg-black/50 m-12">
          <nav className="w-full h-10 bg-white rounded-3xl shadow-md flex flex-row justify-center" id='search-bar-estoque'>
            <div className="w-[67.5vw] flex">
              <div className="w-9/12 flex justify-start">
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
            <div className="w-5/6 h-5/6 flex flex-col justify-start overflow-y-auto max-h-full">
              {filteredItens.map((item) => (
                <div className="item-bar" onClick={() => setModal(!modal)} key={item.id}>
                  <ReactModal 
                    isOpen={modal}
                    className='container-modal'
                    overlayClassName='container-overlay-modal'
                  >

                  </ReactModal>
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
            </div>

            <CustomButton sendTo={"/estoques/entrada"} text='Dar entrada' />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Estoque;
