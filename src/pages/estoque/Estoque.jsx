import React from 'react';


function Estoque() {
  return (
    <div className="login-background">
      <span className='title-technipo'>ESTOQUE</span>
      <div id='center-searcher' className="app-background">
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