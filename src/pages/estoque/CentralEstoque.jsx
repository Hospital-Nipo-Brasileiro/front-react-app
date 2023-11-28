import React, { useEffect } from 'react';
import './StyleCentralEstoque.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBarUser from '../../components/NavBarUser';

function CentralEstoque() {

  useEffect(() => {
    axios.get('http://10.10.204.54:8080/estoques')
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
        <NavBarUser />

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
