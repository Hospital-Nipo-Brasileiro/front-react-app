import React from 'react';
import { Link } from 'react-router-dom';

function CustomButton({ text = "enviar", onclick, sendTo, style}) {
  return (
    <Link to={sendTo}>
      <button
        className={`w-[150px] h-12 bg-white filter drop-shadow-md rounded-xl border-0 mr-5 font-mono text-emerald-500 text-lg transition duration-300 hover:scale-105, ${style}`}
        onClick={onclick}
      >
        {text}
      </button>
    </Link>
  );
}

export default CustomButton;
