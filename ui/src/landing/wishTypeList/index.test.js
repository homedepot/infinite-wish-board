import { shallow } from 'enzyme'
import { WishTypeList } from './index'
import React from 'react'
import { WishType } from '../wishType'

describe('WishList tests when all fields are valid', () => {
  const selectWishType = jest.fn()
  const validFields = jest.fn(() => ({validAge: true, validName: true}))
  const age = '17'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call selectWishType with selected wish when wish is clicked', () => {
    const wrapper = shallow(<WishTypeList selectWishType={selectWishType} validFields={validFields} age={age} />)
    const { GO, MEET, BE, HAVE } = WishType

    const wishCardRocket = wrapper.find('[data-test="wishcard-rocket"]')
    const wishCardAlien = wrapper.find('[data-test="wishcard-alien"]')
    const wishCardAstronaut = wrapper.find('[data-test="wishcard-astronaut"]')
    const wishCardTelescope = wrapper.find('[data-test="wishcard-telescope"]')

    wishCardRocket.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(GO)

    wishCardAlien.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(MEET)

    wishCardAstronaut.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(BE)

    wishCardTelescope.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(HAVE)
  })
})

describe('WishList tests when fields are invalid, assuming the fields have been touched', () => {
  const selectWishType = jest.fn()
  let validFields;
  let age;
  let name;

  it('should display WishTypeList with an age related error', () => {
    validFields = jest.fn(() => ({validAge: false, validName: true, ageTouched: true, nameTouched: true}))
    age = '19'
    name = 'Chris'
    const wrapper = shallow(<WishTypeList selectWishType={selectWishType} validFields={validFields} age={age} name={name} />)
    expect(wrapper.text()).toEqual('Oops! You have to be at least 2 years old, and under 18 to make a wish.')
  })

  it('should display WishTypeList with a name related error', () => {
    validFields = jest.fn(() => ({validAge: true, validName: false, ageTouched: true, nameTouched: true}))
    name = '';
    age = '17';
    const wrapper = shallow(<WishTypeList selectWishType={selectWishType} validFields={validFields} age={age} name={name} />)
    expect(wrapper.text()).toEqual('Oops! You have to enter a name to make a wish.')
  })

  it('should display WishTypeList with a name and age related error', () => {
    validFields = jest.fn(() => ({validAge: false, validName: false, ageTouched: true, nameTouched: true}))
    name = '';
    age = '19';
    const wrapper = shallow(<WishTypeList selectWishType={selectWishType} validFields={validFields} age={age} name={name} />)
    expect(wrapper.text()).toEqual('Oops! You have to be at least 2 years old, and under 18 to make a wish.Oops! You have to enter a name to make a wish.')
  })
})

