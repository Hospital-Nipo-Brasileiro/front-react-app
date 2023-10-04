import React from 'react';
import './StylesTechNipo.css'
import logo from '../../assets/logotype.svg'
import hospital from '../../assets/initial.svg'
import { Link } from 'react-router-dom';


function TechNipo() {

  return (
    <div className="login-background">
      <span className='title-technipo'>TECHNIPO</span>
      <div className="app-background">
        <div>
          <div className="container-logo-login">
            <div className="logotipo-img-txt">
              <img src={logo} alt="logotipo" className='logotipo' />
              <div className="txt-logotipo">
                <span className='txt-logotipo-subtitle'>Beneficiência Nipo Brasileira de São Paulo</span>
                <span className='txt-logotipo-title'>Hospital Nipo-Brasileiro</span>
              </div>
            </div>
            <Link to={"/login"}>
              <button className='btn-login'>Login</button>
            </Link>
          </div>

          <div className="container-content">
            <div className="line"></div>

            <div className="container-info-ti">
              <div className="container-subtitle-ti"><span className='subtitle-ti'>Potencializando a Eficiência e Inovação para o Cuidado ao Paciente</span></div>
              <img src={hospital} className='img-hospital' alt='paciente de um hospital sendo atendido por um doutor utilizando um tablet' />
              <span className='text-ti'>A Tecnologia da Informação (TI) em um hospital desempenha uma missão crítica para a organização, potencializando a
                eficiência e inovação no cuidado ao paciente. Através de sistemas de gestão integrados e acesso a informações em tempo real, a TI otimiza processos,
                permitindo decisões mais informadas e reduzindo erros médicos. Além disso, a adoção de tecnologias inovadoras, como inteligência artificial e análise
                de big data, possibilita a previsão de doenças e a personalização dos cuidados, alinhando-se com as necessidades da instituição e garantindo um
                ambiente de trabalho mais eficiente e focado na qualidade dos serviços prestados.</span>

            </div>

          </div>



        </div>

      </div>
    </div>
  )
}

export default TechNipo;