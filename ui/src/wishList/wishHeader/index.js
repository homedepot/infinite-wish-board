import React from 'react'
import makeAWishLogo from '../../assets/images/Logo_MakeWish.png'
import './styles.scss'
import { withRouter } from "react-router"

const WishHeader = props => {
  const onLogout = () => {
    localStorage.removeItem('username')
    props.history.push('/')
  }

  return (
    <div id="wishHeader">
      <div className="logo-container">
        <img src={makeAWishLogo} className="makeAWishLogo" alt="make a wish logo" />
      </div>
      <div className="user-details">
        <span>Mary</span> |
        <button onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  )
}

export default withRouter(WishHeader)
