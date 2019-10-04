import React from 'react'
import MakeAWishLogo from '../assets/images/Logo_MakeWish_Dark_Blue.png'
import GalaxyLogo from '../assets/images/Logo_Galaxy_Colour_Dark_Blue.png'
import './styles.scss'

export const Header = () => (
  <header>
    <section className="slidingVertical header-item">
      <span>Hello!</span>
      <span>Bonjour!</span>
      <span>Hola!</span>
      <span>你好</span>
      <span>こんにちは</span>
    </section>
    <section className="header-item">
      <img
        className="header-make-a-wish-logo"
        src={MakeAWishLogo}
        alt="Make a Wish"
      />
    </section>
    <section className="header-item">
      <img className="header-galaxy-logo" src={GalaxyLogo} alt="Galaxy Logo" />
    </section>
  </header>
)
