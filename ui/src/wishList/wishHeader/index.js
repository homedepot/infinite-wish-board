import React from 'react'
import makeAWishLogo from '../../assets/images/Logo_MakeWish.png'
import galaxyLogo from '../../assets/images/galaxy.png'
import './styles.scss'

const WishHeader = () => (
  <div id="wishHeader">
    <div className="logo-container">
      <img src={makeAWishLogo} className="makeAWishLogo" alt="make a wish logo" />
      <img src={galaxyLogo} className="galaxyLogo" alt="galaxy logo" />
    </div>
    <div className="user-details">
      <span>Mary</span>|
      <a href="/logout">Sign Out</a>
    </div>
  </div>
)

export default WishHeader
