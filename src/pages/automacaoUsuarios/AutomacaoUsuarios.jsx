import React from 'react';
import './StyleAutomacaoUsuarios.css'
import { Link } from 'react-router-dom';

function AutomacaoUsuarios() {
  return(
    <div className="login-background">
      <span className='title-technipo'>AUTOMAÇÃO</span>
      <div id='center-searcher' className="app-background">
        <div className="navbar-user">
          <Link to={"/home"}>                  
            <div className="container-btn-comeback">
              <img src='' alt=''/>
            </div>
          </Link>
          <div className="container-user-config" >
          </div>
        </div>

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

export default AutomacaoUsuarios;