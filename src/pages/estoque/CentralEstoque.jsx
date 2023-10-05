import React from 'react';
import './StyleCentralEstoque.css'
import { Link } from 'react-router-dom';
import StyledAvatar from '../../components/StyledAvatar';
import BackButton from '../../components/BackButton';


function CentralEstoque() {
  return (
    <div className="login-background">
      <span className="title-technipo">ESTOQUE</span>
      <div className="app-background">
        <div className="navbar-user">
          <BackButton />
          <StyledAvatar />
        </div>

        <div className="container-content-estoques">
          <div className="container-cards-estoque">
            <div className="card-estoque"></div>
            <div className="card-estoque"></div>
            <div className="card-estoque"></div>
            <div className="card-estoque"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CentralEstoque;