import React from 'react'
import { WishType } from '../wishType'
import Rocket from '../../assets/images/newStyle/icon_GO_100x100.svg'
import Alien from '../../assets/images/newStyle/icon_MEET_100x100.svg'
import Astronaut from '../../assets/images/newStyle/icon_BE_100x100.svg'
import Telescope from '../../assets/images/newStyle/icon_HAVE_100x100.svg'
import { WishTypeCard } from '../wishTypeCard'
import './styles.scss'

const styles = {
  text:{
    color: '#000000'
  }

}

export const WishTypeList = ({ selectWishType }) => {
  const { GO, MEET, BE, HAVE } = WishType

  return (
    <>
      <h1 style={styles.text}>I wish to:</h1>
      <ul id="WishTypeList" className="wish-type-select" style={styles.text}>
        <li data-test="wishcard-rocket" style={styles.text} onClick={() => selectWishType(GO)}>
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
    </>
  )
}
