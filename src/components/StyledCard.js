import {Card} from "antd";
import './StyledCard.css';

const StyledCard = ({title, description, image, style}) => {
  return <Card className='styled-card' style={style}>
    {image && <img src={image} className="styled-card_bg-image" alt=""/>}
    <div className="styled-card_title">{title}</div>
    <div className='styled-card_description'>{description}</div>
  </Card>
}

export default StyledCard;