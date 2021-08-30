import './index.css';

const InputButton = ({ style, ...props }) => {
  return (
    <button type='button' className='button' style={style} {...props}>
      {props.children}
    </button>
  );
};

export default InputButton;
