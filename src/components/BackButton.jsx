import React from 'react';
import { Link } from 'react-router-dom';
import backArrow from '../assets/arrow-left.svg'

function BackButton() {
  return (
    <Link to={"/home"}>
        <div className="container-btn-comeback">
            <img className='backarrow' src={backArrow} alt="flexa para esquerda" />
        </div>
    </Link>
  );
}

export default BackButton;