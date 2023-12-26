import React, { useEffect } from 'react';
import './StyleCentralEstoque.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBarUser from '../../components/NavBarUser';
import BackgroundTN from '../../components/BackgroundTN';

function CentralEstoque() {

  useEffect(() => {
    axios.get('http://HSRVWVH00028:8080/estoques')
      .then((response) => {
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, []);

  return (
    <BackgroundTN>
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
    </BackgroundTN>

  );
}

export default CentralEstoque;
