import React from 'react';
import { Link } from 'react-router-dom';

function CustomButton({ text = "enviar", onclick, sendTo, customSytle}) {
  return (
    <Link to={sendTo}>
      <button
        className={`w-[150px] h-12 bg-orange-500 filter drop-shadow-md rounded-xl border-0 mr-5 font-mono text-white text-lg transition duration-300 hover:scale-105, ${customSytle}`}
        onClick={onclick}
      >
        {text}
      </button>
    </Link>
  );
}

export default CustomButton;
