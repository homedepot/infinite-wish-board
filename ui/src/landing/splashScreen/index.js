import React from 'react'
import { Header } from '../../header'
import './styles.scss'
import { WishTypeList } from '../wishTypeList'

export const Landing = ({ name, age, updateField, selectWishType, validFields }) => {
  const nameField = 'name'
  const ageField = 'age'

  return (
    <div id="SplashScreen">
      <Header logout={true} />
      <div className="wish-input">
        <span>My name is </span>
        <input data-test="name-input" placeholder="enter your name" type="text" onChange={(e) => updateField(nameField, e.target.value)} value={name}/>
        <span> and I am </span>
        <input data-test="age-input" placeholder="your age" type="number" className="age-input" onChange={(e) => updateField(ageField, e.target.value)} value={age}/>
        <span> years old!</span>
      </div>
      <WishTypeList selectWishType={selectWishType} validFields={validFields} age={age} name={name} />
    </div>
  )
}
