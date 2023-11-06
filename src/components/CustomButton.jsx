import React from 'react';
import { Link } from 'react-router-dom';

function CustomButton({ text = "enviar", customStyles, onclick, sendTo}) {
  return (
    <Link to={sendTo}>
      <button
        className="w-48 h-12 bg-orange-500 filter drop-shadow-md rounded-3xl border-0 mt-5 mr-5 font-mono text-white text-lg transition duration-300 hover:scale-103"
        style={customStyles}
        onClick={onclick}
      >
        {text}
      </button>
    </Link>
  );
}

export default CustomButton;
