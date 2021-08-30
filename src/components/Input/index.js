import './index.css';

const Input = ({ type, style, ...rest }) => {
  return (
    <input
      type={type ? type : 'text'}
      style={{ ...style }}
      className='input'
      {...rest}
    />
  );
};

export default Input;
