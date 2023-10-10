import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./StyleHome.css"
import { Link } from 'react-router-dom';
import NavBarUser from '../../components/NavBarUser';

function Home() {
    useEffect(() => {
        toast.success('Login bem-sucedido!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }, []);

    return (
        <div className="login-background">
            <div className="app-background">
                <NavBarUser backbtn={false}/>

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
                            <Link to={"/central-estoques"} style={{ textDecoration: "none" }}>
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
            </div>


        </div>
    );
}

export default Home;
