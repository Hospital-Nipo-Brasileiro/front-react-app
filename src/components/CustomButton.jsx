import React from 'react';
import { Link } from 'react-router-dom';

function CustomButton({ text = "enviar", onclick, sendTo, style}) {
  return (
    <Link 
      to={sendTo}
      className={`w-full h-12 hover:scale-105 rounded-xl focus-visible:outline-none`}
    >
      <button
        className={`w-full h-12 bg-gradient-to-br from-green-500 to-blue-300 filter drop-shadow-md rounded-xl border-0 font-mono text-white text-lg transition duration-300 hover:scale-105, ${style} focus-visible:outline-none`}
        onClick={onclick}
      >
        {text}
      </button>
    </Link>
  );
}

export default CustomButton;
