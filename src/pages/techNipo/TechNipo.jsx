import React from 'react';
import './StylesTechNipo.css'

import BackgroundTN from '../../components/BackgroundTN';
import logo from '../../assets/logotype.svg'
import hospital from '../../assets/initial.svg'
import ti from '../../assets/ti-hospital.svg'

import { Link } from 'react-router-dom';

function TechNipo() {

  return (
    <BackgroundTN title='TECHNIPO'>
      <div className='flex justify-between mt-3 md:mt-0'>
        <div className='flex flex-row'>
            <img 
              src={logo} 
              alt='logotipo' 
              className='
                mt-5 ml-5
                md:w-full
                w-10  
              '/>
          </div>
        <Link to={'/login'}>
          <button 
            className='
              bg-blue-50 rounded-xl shadow-xl shadow-black border-0 mt-5 mr-5 font-sans text-emerald-500 font-bold
              2xl:w-48 2xl:h-14 2xl:text-2xl 
              xl:w-44 xl:h-12 xl:text-xl
              lg:w-36 lg:h-12 lg:text-lg
              md:w-24 md:h-9 md:text-lg
              w-20 h-8 text-base'
          >
            Login
          </button>
        </Link>
      </div>

      <div 
        className='
          flex w-full
          2xl:p-5 
          xl:p-4 h-[80%]
          md:h-[75%] md:flex-row
          flex-col
        '
      >
        <div 
          className='
            bg-white 
            xl:mx-10 xl:my-5 md:w-[6px] 
            md:mx-7 md:my-3
            sm:w-[4px] sm:mx-5 sm:my-2
          '
        />

        <div 
          className='flex flex-col
            md:w-1/2 md:pt-5
            w-full px-5
          '
        >
          <div className='w-full md:mt-0 mt-5'>
            <span 
              className='
                font-dm-sans text-white
                2xl:text-4xl
                xl:text-2xl
                lg:text-xl
                md:text-lg md:font-normal
                text-xl font-bold
              '
            >
              Potencializando a Eficiência e Inovação para o Cuidado ao Paciente
            </span>
          </div>
          <img src={hospital} alt='paciente de um hospital sendo atendido por um doutor utilizando um tablet' />
          <div className='mt-5 w-full h-full mb-5 overflow-y-auto'>
            <span className='font-sans text-white text-base scroll-m-28'>A Tecnologia da Informação (TI) em um hospital desempenha uma missão crítica para a organização, potencializando a
              eficiência e inovação no cuidado ao paciente. Através de sistemas de gestão integrados e acesso a informações em tempo real, a TI otimiza processos,
              permitindo decisões mais informadas e reduzindo erros médicos. Além disso, a adoção de tecnologias inovadoras, como inteligência artificial e análise
              de big data, possibilita a previsão de doenças e a personalização dos cuidados, alinhando-se com as necessidades da instituição e garantindo um
              ambiente de trabalho mais eficiente e focado na qualidade dos serviços prestados.
            </span>
          </div>

        </div>

        <div className='w-full flex justify-center'>
          <img 
            className='
              xl:w-[500px] xl:ml-24 xl:mt-10
              md:w-[450px]
            '
            src={ti} 
            alt='Tecnologia da informação do Hospital' 
          />
        </div>
      </div>
    </BackgroundTN>
  )
}

export default TechNipo;