import React, { useEffect, useState } from 'react';
import './StyleCentralEstoque.css';
import StyledAvatar from '../../components/StyledAvatar';
import BackButton from '../../components/BackButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CentralEstoque() {

  const estoques = [
    { id: 1, nome: 'TRIAGEM' },
    { id: 2, nome: 'TEMP' },
    { id: 3, nome: 'T.I.' },
    { id: 4, nome: 'CENTRAL'},
    { id: 5, nome: 'PABX'},
    { id: 6, saida: 'SAIDA'}
  ];

  useEffect(() => {
    axios.get('http://localhost:8080/estoques')
      .then((response) => {
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, []);

  return (
    <div className="login-background">
      <span className="title-technipo">ESTOQUE</span>
      <div className="app-background" id='app-background-estoque'>
        <div className="navbar-user">
          <BackButton />
          <StyledAvatar />
        </div>

        <div className="container-content-estoques">
          <Link to={`/estoques/1`} style={{ textDecoration: "none" }}>
            <div className="card-estoque">
              <span className='text-automacao'>TRIAGEM</span>
            </div>
          </Link>

          <Link to={`/estoques/2`} style={{ textDecoration: "none" }}>
            <div className="card-estoque">
              <span className='text-automacao'>TEMP</span>
            </div>
          </Link>

          <Link to={`/estoques/3`} style={{ textDecoration: "none" }}>
            <div className="card-estoque">
              <span className='text-automacao'>T.I.</span>
            </div>
          </Link>

          <Link to={`/estoques/4`} style={{ textDecoration: "none" }}>
            <div className="card-estoque">
              <span className='text-automacao'>CENTRAL</span>
            </div>
          </Link>

          <Link to={`/estoques/5`} style={{ textDecoration: "none" }}>
            <div className="card-estoque">
              <span className='text-automacao'>PABX</span>
            </div>
          </Link>

          <Link to={`/estoques/6`} style={{ textDecoration: "none" }}>
            <div className="card-estoque">
              <span className='text-automacao'>SAIDA</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CentralEstoque;
