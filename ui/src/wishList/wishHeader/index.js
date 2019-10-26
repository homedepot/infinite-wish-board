import React from 'react'
import makeAWishLogo from '../../assets/images/Logo_MakeWish.png'
import './styles.scss'

const WishHeader = (props) => (
  <div id="wishHeader">
    <div className="logo-container">
      <img src={makeAWishLogo} className="makeAWishLogo" alt="make a wish logo" />
    </div>
    <div className="user-details">
      <span>{props.username}</span> |
      <a href="/logout">Sign Out</a>
    </div>
  </div>
)

export default WishHeader
