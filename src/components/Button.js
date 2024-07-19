import {Button as AntButton} from "antd";
import './Button.css'

const Button = (props) => {
  return <AntButton className='custom-button' {...props}/>;
}

export default Button;