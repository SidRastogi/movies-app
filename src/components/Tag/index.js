import './index.css';

const Tag = ({ title, style, ...props }) => {
  return (
    <span style={style} className='Tag' {...props}>
      {title}
    </span>
  );
};

export default Tag;
