import React, { useState } from 'react';
import Input from './Input';

function AutocompleteInput({ suggestions, formData, setFormData, ...props}) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  
    // Filtrar sugestões com base no valor de entrada
    const filtered = suggestions.filter((suggestion) =>
      String(suggestion.ds_nome).toLowerCase().includes(inputValue.toLowerCase())
    );
  
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.ds_nome);
    
    setFormData({
      id: suggestion.id,
      pessoaSelecionada: suggestion.ds_nome,
      cpfPessoaExistente: suggestion.nr_cpf,
      dataAdmissaoPessoaExistente: suggestion.dt_admissao,
      tipoContratoPessoaExistente: suggestion.tp_contrato
    });

    setFilteredSuggestions([]);
  };
  
  return (
    <div className='relative'>
      <Input
        {...props}
        value={inputValue}
        onChange={handleInputChange}
      />
      {filteredSuggestions.length > 0 && (
        <ul className='absolute top-full left-0 bg-slate-100 border border-gray-300 rounded-md mt-1 w-full h-48 overflow-auto'>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.ds_nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteInput;
