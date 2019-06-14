import React, { Component } from 'react'
import makeAWishLogo from '../../assets/Logo_MakeWish.png'
import galaxyLogo from '../../assets/Logo_Galaxy.png'
import './styles.scss'

export default class WishHeader extends Component {
    render() {
        return (
            <div id="wishHeader">
                <div className="logo-container">
                    <img src={makeAWishLogo} className="makeAWishLogo" alt="make a wish logo" />
                    <img src={galaxyLogo} className="galaxyLogo" alt="galaxy logo" />
                </div>
                <div className="user-details">
                    <span>Mary</span> | 
                    <a href="#">Sign Out</a>
                </div>
            </div>
        )
    }
}
