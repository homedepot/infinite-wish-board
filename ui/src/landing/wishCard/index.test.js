import React from 'react'
import { shallow } from 'enzyme'
import { WishCard } from './index'

describe('WishCard tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<WishCard />)
    expect(wrapper).toMatchSnapshot()
  })
})
