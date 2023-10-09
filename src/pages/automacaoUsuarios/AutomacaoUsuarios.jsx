import React from 'react';
import './StyleAutomacaoUsuarios.css'
import NavBarUser from '../../components/NavBarUser';

function AutomacaoUsuarios() {
  return (
    <div className="login-background">
      <span className='title-technipo'>AUTOMAÇÃO</span>
      <div id='center-searcher' className="app-background">
        <NavBarUser />

        <div className="container-searcher">
          <div className="search-navbar" />
          <div className="container-items">
            <div className="container-content-items">
              <div id='item-number-one' className="item-bar"></div>
              <div className="item-bar" />
              <div className="item-bar" />
              <div className="item-bar" />
              <div className="item-bar" />
              <div className="item-bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutomacaoUsuarios;