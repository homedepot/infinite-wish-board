import { shallow } from 'enzyme'
import { WishTypeList } from './index'
import React from 'react'
import { WishType } from '../wishType'

describe('WishList tests when all fields are valid', () => {
  const selectWishType = jest.fn()
  const validFields = jest.fn(() => ({validAge: true}))
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

describe('WishList tests when a field is invalid', () => {
  const selectWishType = jest.fn()
  const validFields = jest.fn(() => ({validAge: false}))
  const age = '19'

  it('should call selectWishType with selected wish when wish is clicked', () => {
    const wrapper = shallow(<WishTypeList selectWishType={selectWishType} validFields={validFields} age={age} />)
    expect(wrapper.text()).toEqual('Oops! You have to be at least 2 years old, and under 18 to make a wish.')
  })
})

