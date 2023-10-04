import React from 'react';
import './StyleCentralEstoque.css'
import { Link } from 'react-router-dom';

function CentralEstoque() {
    const handleConfigUser = () => {

    }

  return(
    <div className="login-background">
        <span className='title-technipo'>ESTOQUE</span>
        <div className="app-background">
            <div className="navbar-user">
                <Link to={"/home"}>                  
                    <div className="container-btn-comeback">
                        <img src='' alt=''/>
                    </div>
                </Link>

                <div className="container-user-config" onClick={handleConfigUser}>

                </div>
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