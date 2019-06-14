import React from 'react'
import MakeAWishLogo from '../assets/Logo_MakeWish.png'
import GalaxyLogo from '../assets/Logo_Galaxy_Colour_Dark_Blue.png'
import './styles.scss'

export const Header = () => (
  <div id="MakeAWishHeader">
    <span className="header-title">Hello!</span>
    <img className="header-make-a-wish-logo" src={MakeAWishLogo} alt="Make a Wish" />
    <img className="header-galaxy-logo" src={GalaxyLogo} alt="Galaxy Logo" />
  </div>
)
