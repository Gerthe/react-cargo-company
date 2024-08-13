import {Button as AntButton} from "antd";

const Button = (props) => {
  return <AntButton className='custom-button' {...props} style={{
    border: 'none',
    cursor: 'pointer',
    fontSize: 20,
    height: 40,
    boxShadow:'none'
  }}/>;
}

export default Button;