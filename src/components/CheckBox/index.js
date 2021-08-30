import React, { useRef } from 'react';
import './index.css';

const CheckBox = ({ value, onChange, ...rest }) => {
  const inputRef = useRef();
  const inputHandler = () => {
    onChange(inputRef.current.checked);
  };
  return (
    <input
      className='checkBox'
      checked={value}
      ref={inputRef}
      type='checkbox'
      onChange={inputHandler}
      {...rest}
    />
  );
};

export default CheckBox;
