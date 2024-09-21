import React from 'react';
import { Card } from 'antd';
import './StyledCard.css';
import PropTypes from 'prop-types';

const StyledCard = ({ title, description, image, style }) => {
  return (
    <Card className="styled-card" style={style}>
      {image && <img src={image} className="styled-card_bg-image" alt="" />}
      <div className="styled-card_title">{title}</div>
      <div className="styled-card_description">{description}</div>
    </Card>
  );
};

StyledCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  style: PropTypes.object,
};

export default StyledCard;
