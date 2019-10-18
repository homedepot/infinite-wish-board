import React from 'react'
import MakeAWishLogo from '../assets/images/MAW_Georgia_white.png'
import './styles.scss'

export const Header = () => (
  <header>
    <div className="header-item">
      <img
        className="header-make-a-wish-logo"
        src={MakeAWishLogo}
        alt="Make a Wish"
      />
    </div>
  </header>
)
