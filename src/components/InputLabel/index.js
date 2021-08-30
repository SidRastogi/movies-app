import './index.css';

const InputLabel = (props) => {
  return (
    <span className='inputLabel' style={{ ...props.style }}>
      {props.children}
    </span>
  );
};

export default InputLabel;
