import React from 'react';
import NavBarUser from '../../components/NavBarUser';


function Acessos() {
  return (
    <div className="login-background">
      <span className='title-technipo'>ACESSOS</span>
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

export default Acessos;