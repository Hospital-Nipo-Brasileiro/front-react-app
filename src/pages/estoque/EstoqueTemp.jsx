import React, { useEffect, useState } from 'react';
import NavBarUser from '../../components/NavBarUser';
import axios from 'axios';
import './StyleEstoqueTemp.css';

function Estoque() {
  const [itens, setItens] = useState([]);
  const [nameItem, setNameItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/estoques/1/itens')
      .then((response) => {
        setItens(response.data);
        response.data.forEach((item) => {
          axios.get(`http://localhost:8080/itens/${item.id_item}`)
            .then((res) => {
              setNameItem(prevNameItem => ({
                ...prevNameItem,
                [item.id_item]: res.data.ds_nome,
              }));
            })
            .catch((err) => {
              console.error('Erro ao buscar item: ', err);
            });
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, []);

  const filteredItens = itens.filter((item) => {
    const zonaNome = item.TN_T_PRATELEIRA?.TN_T_ARMARIO?.TN_T_ZONA?.ds_nome || '';
    const bauZonaNome = item.TN_T_BAU?.TN_T_ZONA?.ds_nome || '';
    const armarioNome = item.TN_T_PRATELEIRA?.TN_T_ARMARIO?.ds_nome || '';
    const prateleiraNome = item.TN_T_PRATELEIRA?.ds_nome || '';
    const itemNome = nameItem[item.id_item] || '';

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
    <div className="login-background">
      <span className='title-technipo'>ESTOQUE</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser backbtn={true} />

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
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="container-item-quantity">
              <span className='span-items'>qnt</span>
            </div>
          </div>
          <div className="container-items">
            <div className="container-content-items">
              {filteredItens.map((item) => (
                <div className="item-bar" key={item.id}>
                  <span className='span-items'>{item.id}</span>
                  <span className='span-items'>
                    {item.TN_T_PRATELEIRA?.TN_T_ARMARIO?.TN_T_ZONA?.ds_nome ?? item.TN_T_BAU?.TN_T_ZONA?.ds_nome}
                  </span>
                  <span className='span-items'>
                    {item.TN_T_PRATELEIRA?.TN_T_ARMARIO?.ds_nome ?? "-"}
                  </span>
                  <span className='span-items'>
                    {item.TN_T_PRATELEIRA?.ds_nome ?? "-"}
                  </span>
                  <span className='span-items'>{item.TN_T_BAU?.id ?? "-"}</span>
                  <span className='span-items'>{nameItem[item.id_item] ?? "-"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estoque;
