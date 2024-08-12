import {Button as AntButton} from "antd";

const Button = (props) => {
  return <AntButton className='custom-button' {...props} style={{
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: 20
  }}/>;
}

export default Button;