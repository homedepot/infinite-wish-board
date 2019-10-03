import React, { Fragment } from 'react'
import { WishType } from '../wishType'
import Rocket from '../../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'
import { WishTypeCard } from '../wishTypeCard'
import './styles.scss'

export const WishTypeList = ({ selectWishType }) => {
  const { GO, MEET, BE, HAVE } = WishType

  return (
    <Fragment>
      <h1>I wish to:</h1>
      <ul id="WishTypeList" className="wish-type-select">
        <li data-test="wishcard-rocket" onClick={() => selectWishType(GO)}>
          <WishTypeCard
            altText="Rocket"
            imgSrc={Rocket}
            title={GO}
            subtitle="Somewhere!"
          />
        </li>
        <li data-test="wishcard-alien" onClick={() => selectWishType(MEET)}>
          <WishTypeCard
            altText="Alien"
            imgSrc={Alien}
            title={MEET}
            subtitle="Someone!"
          />
        </li>
        <li data-test="wishcard-astronaut" onClick={() => selectWishType(BE)}>
          <WishTypeCard
            altText="Astronaut"
            imgSrc={Astronaut}
            title={BE}
            subtitle="Someone!"
          />
        </li>
        <li data-test="wishcard-telescope" onClick={() => selectWishType(HAVE)}>
          <WishTypeCard
            altText="Telescope"
            imgSrc={Telescope}
            title={HAVE}
            subtitle="Something!"
          />
        </li>
      </ul>
    </Fragment>
  )
}
