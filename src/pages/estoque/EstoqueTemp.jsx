import React, { useEffect, useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import './StyleEstoqueTemp.css'

function Estoque() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/estoques/1/itens')
      .then((response) => {
        setItens(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, []);

  return (
    <div className="login-background">
      <span className='title-technipo'>ESTOQUE</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true}/>

        <div className="container-searcher">
          <div className="search-navbar" id='search-bar-estoque'>
            <div className="container-local-items">
              <span className='span-items'>id</span>
              <span className='span-items'>zona</span>
              <span className='span-items'>armário</span>
              <span className='span-items'>prateleira</span>
              <span className='span-items'>baú</span>
              <span className='span-items'>item</span>
            </div>
            <div className="search-bar">

            </div>
            <div className="container-item-quantity">
              <span className='span-items'>qnt</span>
            </div>
          </div>
          <div className="container-items">
            <div className="container-content-items">
              {itens.map((item, index) => (
                <div className="item-bar" key={index}>
                  <span className='span-items'>{item.id}</span>
                  <span className='span-items'>{item.TN_T_PRATELEIRA?.TN_T_ARMARIO?.TN_T_ZONA?.ds_nome ?? item.TN_T_BAU?.TN_T_ZONA?.ds_nome}</span>
                  <span className='span-items'>{item.TN_T_PRATELEIRA?.TN_T_ARMARIO?.ds_nome ?? "-"}</span>
                  <span className='span-items'>{item.TN_T_PRATELEIRA?.ds_nome ?? "-"}</span>
                  <span className='span-items'>{item.TN_T_BAU?.id ?? "-"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estoque;