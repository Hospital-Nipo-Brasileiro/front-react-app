import React from 'react';
import { Link } from 'react-router-dom';
import backArrow from '../assets/arrow-left.svg'

function BackButton({screenPath = "/home"}) {
  return (
    <Link to={`${screenPath}`}>
        <div className="w-[40px] h-[40px] rounded-3xl bg-[#EDF06C] ml-1">
            <img className='backarrow' src={backArrow} alt="flexa para esquerda" />
        </div>
    </Link>
  );
}

export default BackButton;