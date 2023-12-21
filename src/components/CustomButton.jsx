import React from 'react';
import { Link } from 'react-router-dom';

function CustomButton({ text = "enviar", onclick, sendTo, customStyle, bgDefault = true, bgColor }) {
  return (
    <Link
      to={sendTo}
      className={`w-full h-12 hover:scale-105 rounded-xl focus-visible:outline-none`}
      onClick={onclick}
    >
      <div
        className={`flex items-center justify-center w-full h-12 ${bgDefault === true ? "bg-gradient-to-br from-green-500 to-blue-300" : bgColor} filter drop-shadow-md rounded-xl border-0 font-mono text-white text-lg transition duration-300 hover:scale-105, ${customStyle} focus-visible:outline-none`}
      >
        {text}
      </div>
    </Link>
  );
}

export default CustomButton;
