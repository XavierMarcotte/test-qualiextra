import React, { useState } from 'react';

const dynamicInput = () => {
  const [inputType, setInputType] = useState('text');

  const handleFocus = () => {
    setInputType('date');
  };

  return (
    <input type={inputType} onFocus={handleFocus} />
  );
};


export default dynamicInput()