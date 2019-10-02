import React from 'react'
import MakeAWishLogo from '../assets/images/Logo_MakeWish_Dark_Blue.png'
import GalaxyLogo from '../assets/images/Logo_Galaxy_Colour_Dark_Blue.png'
import './styles.scss'

export const Header = () => (
  <header>
    <div className="header--row">
      <div className="header-item">
        <img
          className="header-make-a-wish-logo"
          src={MakeAWishLogo}
          alt="Make a Wish"
        />
      </div>
      <div className="header-item">
        <img
          className="header-galaxy-logo"
          src={GalaxyLogo}
          alt="Galaxy Logo"
        />
      </div>
    </div>
    <div className="header-row">
      <div className="slidingVertical header-item">
        <span>Hello!</span>
        <span>Bonjour!</span>
        <span>Hola!</span>
        <span>你好</span>
        <span>こんにちは</span>
      </div>
    </div>
  </header>
)
