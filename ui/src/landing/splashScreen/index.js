import React from 'react'
import { Header } from '../../header'
import './styles.scss'
import { WishTypeList } from '../wishTypeList'

export const Landing = ({ name, age, updateField, selectWishType, validFields }) => {
  const nameField = 'name'
  const ageField = 'age'

  const DisplayWishTypeList = ({selectWishType}) => {
    if (validFields()) {
      return <WishTypeList selectWishType={selectWishType} />
    } else {
      return (<span className="fields-not-valid">
        Please enter a name and age (note: you have to be under 18 to make a wish).
      </span>);
    }
  }

  return (
    <div id="SplashScreen">
      <Header />
      <div className="wish-input">
        <span>My name is </span>
        <input data-test="name-input" placeholder="enter your name" type="text" onChange={(e) => updateField(nameField, e.target.value)} value={name}/>
        <span> and I am </span>
        <input data-test="age-input" placeholder="your age" type="number" className="age-input" onChange={(e) => updateField(ageField, e.target.value)} value={age}/>
        <span> years old!</span>
      </div>
      <DisplayWishTypeList selectWishType={selectWishType}/>
    </div>
  )
}
