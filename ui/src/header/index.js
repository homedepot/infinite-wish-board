import React from 'react'
import MakeAWishLogo from '../assets/images/Logo_MakeWish_Dark_Blue.png'
import GalaxyLogo from '../assets/images/Logo_Galaxy_Colour_Dark_Blue.png'
import './styles.scss'

export const Header = () => (
  <div id="makeAWishHeader">
    <div class="header-title">
      <div class="slidingVertical">
        <span>Hello!</span>
        <span>Bonjour!</span>
        <span>Hola!</span>
        <span>你好</span>
        <span>こんにちは</span>
      </div>
    </div>
    <img className="header-make-a-wish-logo" src={MakeAWishLogo} alt="Make a Wish" />
    <img className="header-galaxy-logo" src={GalaxyLogo} alt="Galaxy Logo" />
  </div>
)
