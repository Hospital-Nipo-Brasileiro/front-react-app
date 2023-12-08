// Select.js

import React, { useState } from 'react';
import ModalSelected from './ModalSelected.jsx';

const Select = ({ options, onSelect, label }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    setSelectedOption(option);
    setModalOpen(false);

    onSelect(option.value);
  };

  return (
    <>
      <label className="text-orange-500">{label}</label>
      <div
        className="w-full h-8 mt-1 px-1 flex items-center border rounded-xl bg-slate-100 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
        onClick={handleButtonClick}
      >
        <span>{selectedOption ? selectedOption.label : 'Selecione o Local'}</span>
      </div>

      {modalOpen && (
        <ModalSelected onClose={() => setModalOpen(false)}>
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="py-2 px-4 cursor-pointer hover:bg-slate-100 hover:rounded-xl"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </ModalSelected>
      )}
    </>
  );
};

export default Select;
