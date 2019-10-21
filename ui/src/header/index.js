import React from 'react'
import MakeAWishLogo from '../assets/images/MAW_Georgia_white.png'
import RocketLogo from '../assets/images/TheSkyisTheLimitLogo.png'
import './styles.scss'

export const Header = () => (
  <header>
    <section className="slidingVertical header-item" style={{color: 'white'}}>
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
      <img className="header-rocket-logo" src={RocketLogo} alt="Rocket Logo" />
    </section>
  </header>
)
