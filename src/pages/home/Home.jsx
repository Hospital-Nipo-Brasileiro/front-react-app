import React from 'react';
import './StyleHome.css'
import { Link } from 'react-router-dom';
import StyledAvatar from '../../components/StyledAvatar';
import BackgroundTN from '../../components/BackgroundTN';
import automation from '../../assets/card-automation.svg';
import estoque from '../../assets/card-estoque.svg';
import acessos from '../../assets/card-acessos.svg'
import admin from '../../assets/card-admin.svg'

function Home() {

  return (
    <BackgroundTN customStyledApp={'h-screen md:h-5/6'}>
      <div className='w-full h-12 rounded-3xl flex justify-end bg-white'>
        <StyledAvatar />
      </div>

      <div className='w-full h-5/6 px-24 py-10 flex flex-col items-center justify-between'>
        <Link to={'/automation'} style={{ textDecoration: 'none' }} className='mx-3 rounded-2xl w-full p-0 h-2/5 flex justify-center items-center'>
          <img src={automation} alt='' className='object-cover w-full h-full rounded-2xl '/>
          <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            AUTOMAÇÃO DE USUÁRIOS
          </span>
        </Link>

        {/*  MOBILE  */}
        <Link to={'/acessos'} style={{ textDecoration: 'none' }} className='md:hidden mx-3 rounded-2xl w-full p-0 h-2/5 flex justify-center items-center'>
          <img src={acessos} alt='' className='object-cover w-full h-full rounded-2xl '/>
          <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            ACESSOS
          </span>
        </Link>

        <Link to={'/admin'} style={{ textDecoration: 'none' }} className='md:hidden mx-3 rounded-2xl w-full p-0 h-2/5 flex justify-center items-center'>
          <img src={admin} alt='' className='object-cover w-full h-full rounded-2xl '/>
          <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            ADMIN
          </span>
        </Link>

        <Link to={'/estoque'} style={{ textDecoration: 'none' }} className='md:hidden mx-3 rounded-2xl w-full p-0 h-2/5 flex justify-center items-center'>
          <img src={estoque} alt='' className='object-cover w-full h-full rounded-2xl '/>
          <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            ESTOQUE
          </span>
        </Link>       

        {/*  COMPUTER  */}
        <div className='md:flex md:justify-between md:w-full md:h-2/5 hidden'>
          <Link to={'/acessos'} style={{ textDecoration: 'none' }} className='mx-3 rounded-3xl w-1/3 h-full flex items-center justify-center'>
            <img src={acessos} alt='' className='object-cover'/>
            <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            ACESSOS
          </span>
          </Link>

          <Link to={'/admin'} style={{ textDecoration: 'none' }} className='mx-3 rounded-3xl w-1/3 h-full flex items-center justify-center'>
            <img src={admin} alt='' className='object-cover'/>
            <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            ADMIN
          </span>
          </Link>

          <Link to={'/estoques/central'} style={{ textDecoration: 'none' }} className='rounded-3xl w-1/3 p-0 h-full flex items-center justify-center'>
            <img src={estoque} alt='' className='object-cover'/>
            <span 
            className='
              font-bayon text-white text-shadow absolute
              2xl:text-7xl 
              xl:text-6xl
              lg-text-5xl
              md:text-3xl
              text-lg
            '
          >
            ESTOQUE
          </span>
          </Link>

        </div> 
      </div>
    </BackgroundTN>

  );
}

export default Home;
