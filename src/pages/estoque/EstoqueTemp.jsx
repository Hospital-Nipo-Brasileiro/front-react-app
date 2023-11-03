import React, { useEffect, useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import './StyleEstoqueTemp.css';
import lupa from '../../assets/lupa.svg'
import ReactModal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';

function Estoque() {
  const [itens, setItens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split('/').pop();

  useEffect((req) => {
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

        <div className="container-searcher">
          <div className="search-navbar" id='search-bar-estoque'>
            <div className="container-content-items-estoque">
              <div className="container-local-items">
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
          </div>
          <div className="container-items">
            <div className="container-content-items">
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

            <Link to={"/estoques/entrada"}>
              <div className="circle-add-item">
                <button>Dar Entrada em um novo item</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estoque;
