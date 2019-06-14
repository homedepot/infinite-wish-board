import React, { Fragment } from 'react'
import { WishType } from '../wishType'
import Rocket from '../../assets/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../../assets/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../../assets/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../../assets/icn_To_See_Telescope_White_Inside_130x130.png'
import { WishCard } from '../wishCard'
import './styles.scss'

export const WishList = ({ selectWishType }) => {
  const { GO, MEET, BE, SEE } = WishType

  return (
    <Fragment>
      <h1>I wish to:</h1>
      <ul id="WishList" className="wish-type-select">
        <li data-test="wishcard-rocket" onClick={() => selectWishType(GO)}>
          <WishCard altText="Rocket" imgSrc={Rocket} title={GO} subtitle="Somewhere!" />
        </li>
        <li data-test="wishcard-alien" onClick={() => selectWishType(MEET)}>
          <WishCard altText="Alien" imgSrc={Alien} title={MEET} subtitle="Someone!" />
        </li>
        <li data-test="wishcard-astronaut" onClick={() => selectWishType(BE)}>
          <WishCard altText="Astronaut" imgSrc={Astronaut} title={BE} subtitle="Someone!" />
        </li>
        <li data-test="wishcard-telescope" onClick={() => selectWishType(SEE)}>
          <WishCard altText="Telescope" imgSrc={Telescope} title={SEE} subtitle="Something!" />
        </li>
      </ul>
    </Fragment>
  )
}
