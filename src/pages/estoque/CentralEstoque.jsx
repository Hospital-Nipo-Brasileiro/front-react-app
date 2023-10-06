import React, { useEffect, useState } from 'react';
import './StyleCentralEstoque.css';
import StyledAvatar from '../../components/StyledAvatar';
import BackButton from '../../components/BackButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CentralEstoque() {

  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/estoques')
      .then((response) => {
        setEstoques(response.data); // Atualiza o estado com os dados obtidos
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados dos estoques:', error);
      });
  }, []);

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
            {estoques.map((estoque, index) => (
              <Link to={`/estoque/${estoque.id}`} className="container-link-card-estoque" key={index} style={{ textDecoration: "none" }}>
                <div className="card-estoque">
                  <span className='text-automacao' >{estoque.ds_nome}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CentralEstoque;
