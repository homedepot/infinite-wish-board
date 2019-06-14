import React from 'react'
import './styles.scss'

export const WishCard = ({imgSrc, altText, title, subtitle}) => (
  <div id="WishCard" className="containerVertical" data-wishType="GO">
    <img src={imgSrc} alt={altText} className="wish-card-image"/>
    <h2>{title}</h2>
    <span>{subtitle}</span>
  </div>
)
