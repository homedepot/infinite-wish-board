import React, { Fragment } from 'react'
import { WishType } from '../wishType'
import Rocket from '../../assets/images/newStyle/icon_GO_100x100.svg'
import Alien from '../../assets/images/newStyle/icon_MEET_100x100.svg'
import Astronaut from '../../assets/images/newStyle/icon_BE_100x100.svg'
import Telescope from '../../assets/images/newStyle/icon_HAVE_100x100.svg'
import { WishTypeCard } from '../wishTypeCard'
import './styles.scss'

export const WishTypeList = ({ selectWishType, validFields, age }) => {
  const { GO, MEET, BE, HAVE } = WishType

  const {validAge} = validFields(age);
  
  if (validAge) {
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
  } else {
    return (
      <div className="fields-not-valid">
        <ul>
          <li>Oops! You have to be at least 2 years old, and under 18 to make a wish.</li>
        </ul>
      </div>);
  }
}
