import React from 'react'
import './styles.scss'

export const WishCard = ({imgSrc, altText, title, subtitle}) => (
  <div id="WishCard" className="containerVertical" data-wishType="GO">
    <img src={imgSrc} alt={altText} className="wish-card-image"/>
    <span className="card-title">{title}</span>
    <span className="card-subtitle">{subtitle}</span>
  </div>
)
