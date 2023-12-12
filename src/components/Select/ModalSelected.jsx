// Modal.js

import React from 'react';

const ModalSelected = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex pl-[350px] pt-[220px] bg-black bg-opacity-25">
      <div className="bg-white border p-2 w-[170px] h-[190px] rounded-lg overflow-auto">
        {children}
        <button
          className="mt-1 bg-orange-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalSelected;
