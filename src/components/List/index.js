import './index.css';

const List = ({ data, itemRender, style, ...rest }) => {
  return data?.length > 0 ? (
    <div className='listContainer' style={style} {...rest}>
      {data.map((item, index) => {
        return itemRender(item, index);
      })}
    </div>
  ) : null;
};

export default List;
