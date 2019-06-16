import { shallow } from 'enzyme'
import { WishTypeList } from './index'
import React from 'react'
import { WishType } from '../wishType'

describe('WishList tests', () => {
  const selectWishType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call selectWishType with selected wish when wish is clicked', () => {
    const wrapper = shallow(<WishTypeList selectWishType={selectWishType}/>)
    const { GO, MEET, BE, SEE } = WishType

    const wishCardRocket = wrapper.find('[data-test="wishcard-rocket"]');
    const wishCardAlien = wrapper.find('[data-test="wishcard-alien"]');
    const wishCardAstronaut = wrapper.find('[data-test="wishcard-astronaut"]');
    const wishCardTelescope = wrapper.find('[data-test="wishcard-telescope"]');

    wishCardRocket.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(GO)

    wishCardAlien.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(MEET)

    wishCardAstronaut.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(BE)

    wishCardTelescope.simulate('click')
    expect(selectWishType).toHaveBeenCalledWith(SEE)

  })
})
