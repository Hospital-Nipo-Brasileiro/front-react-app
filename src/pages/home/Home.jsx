import React from 'react';
import "./StyleHome.css"
import { Link } from 'react-router-dom';
import StyledAvatar from '../../components/StyledAvatar';
import BackgroundTN from '../../components/BackgroundTN';
import automation from '../../assets/card-automation.svg';
import estoque from '../../assets/card-estoque.svg';
import acessos from '../../assets/card-acessos.svg'

function Home() {

  return (
    <BackgroundTN>
      <div className='w-full h-12 rounded-3xl flex justify-end bg-white'>
        <StyledAvatar />
      </div>

      <div className="w-full h-5/6 px-24 py-10 flex flex-col items-center justify-between">
        <Link to={"/automation"} style={{ textDecoration: "none" }} className='rounded-2xl w-full p-0 h-2/5 flex justify-center items-center'>
          <img src={automation} alt='' className='object-cover w-full h-full rounded-2xl '/>
          <span className="font-bayon text-white text-7xl text-shadow absolute">AUTOMAÇÃO DE USUÁRIOS</span>
        </Link>
{/* 
        <div className='flex justify-between w-full h-2/5'>
          <Link to={"/acessos"} style={{ textDecoration: "none" }} className='bg-pink-500 w-full h-full'>
            <img src={acessos} alt='' className='object-cover w-full h-full '/>
            <span className="font-bayon text-white text-7xl text-shadow absolute">ACESSOS</span>
          </Link> 

          <Link to={"/acessos"} style={{ textDecoration: "none" }} className='rounded-2xl bg-pink-500 w-full p-0 h-full flex items-center justify-center'>
            <img src={acessos} alt='' className='object-contain '/>
            <span className="font-bayon text-white text-7xl text-shadow absolute">ACESSOS</span>
          </Link>

        </div> */}
      </div>
    </BackgroundTN>

  );
}

export default Home;
