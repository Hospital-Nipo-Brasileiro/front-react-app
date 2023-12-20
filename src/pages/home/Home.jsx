import React from 'react';
import "./StyleHome.css"
import { Link } from 'react-router-dom';
import StyledAvatar from '../../components/StyledAvatar';
import BackgroundTN from '../../components/BackgroundTN';

function Home() {

  return (
    <BackgroundTN>
      <div className='w-full h-12 rounded-3xl flex justify-end bg-white'>
        <StyledAvatar />
      </div>

      <div className="container-content-home">
        <div className="container-card-automacao">
          <Link to={"/automation"} style={{ textDecoration: "none" }}>
            <div className="container-filtro-fosco">
              <span className="text-automacao">AUTOMAÇÃO DE USUÁRIOS</span>
            </div>
          </Link>
        </div>

        <div className="container-double-cards">
          <div className="container-card-estoque">
            <Link to={"/estoques/central"} style={{ textDecoration: "none" }}>
              <div className="container-filtro-fosco">
                <span className="text-automacao">ESTOQUE</span>
              </div>
            </Link>
          </div>

          <div className="container-card-acessos">
            <Link to={"/acessos"} style={{ textDecoration: "none" }}>
              <div className="container-filtro-fosco">
                <span className="text-automacao">ACESSOS</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </BackgroundTN>

  );
}

export default Home;
