import React, { useEffect, useState } from 'react';
import NavBarUser from '../../components/NavBarUser';


function Estoque() {
    const [itemCount, setItemCount] = useState(null);

    useEffect(() => {
      fetch('GET', 'http:localhost:8080/estoques/1') // Substitua '/api/estoque/1' pela rota correta do seu servidor
        .then(response => response.json())
        .then(data => {
          setItemCount(data.item_count); // Atualiza o estado com a quantidade de itens
        })
        .catch(error => {
          console.error('Erro ao buscar a quantidade de itens:', error);
        });
    }, []);

  return (
    <div className="login-background">
      <span className='title-technipo'>ESTOQUE</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser />
        
        <div className="container-searcher">
          <div className="search-bar"/>
          <div className="container-items">
            <div className="container-content-items">
              <div id='item-number-one' className="item-bar"></div>
              <div className="item-bar"/>
              <div className="item-bar"/>
              <div className="item-bar"/>
              <div className="item-bar"/>
              <div className="item-bar"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Estoque;