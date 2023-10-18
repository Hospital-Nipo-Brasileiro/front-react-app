import React from 'react';
import styled from 'styled-components';

function CustomButton({text="enviar", customStyles, onclick}) {
    const StyledButton = styled.button`
    width: 12.5625rem;
    height: 3.1875rem;
    background-color: #FF7A00;
    filter: drop-shadow(8px 8px 17px #7C4512);
    border-radius: 20px;
    border: 0;
    margin-top: 20px;
    margin-right: 20px;
    font-family: 'Basic', sans-serif;
    color: #fff;
    font-size: 1.5rem;
    transition: 0.3s;
    &:hover{
      transform: scale(1.03);
      transition: 0.3s;
    }
    `;


  return (
    <StyledButton style={customStyles} onClick={onclick}>{text}</StyledButton>
  );
}

export default CustomButton;