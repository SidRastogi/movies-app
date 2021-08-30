import React, { useRef } from 'react';
import './index.css';

const RadioBox = ({ value, onChange, ...rest }) => {
  const inputRef = useRef();
  const inputHandler = (e) => {
    onChange(inputRef.current.checked);
  };
  return (
    <input
      className='RadioBox'
      checked={value}
      ref={inputRef}
      type='radio'
      onChange={inputHandler}
      {...rest}
    />
  );
};

export default RadioBox;
