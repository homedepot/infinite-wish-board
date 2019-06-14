import CreateWish from './CreateWish'
import { shallow } from 'enzyme'
import React from 'react'
import { WishType } from './wishType'

describe('CreateWish tests', () => {

  it('should update the state for the desired field', () => {
    const wrapper = shallow(<CreateWish/>)

    const name = 'Susan'
    wrapper.instance().updateField('name', name)
    expect(wrapper.state().name).toEqual(name)

    const age = 14
    wrapper.instance().updateField('age', age)
    expect(wrapper.state().age).toEqual(age)
  })

  it('should set the wishType when selectWishType is called', () => {
    const wrapper = shallow(<CreateWish/>)

    const wishType = WishType.SEE
    wrapper.instance().selectWishType(wishType)
    expect(wrapper.state().wishType).toEqual(wishType)
  })
})
