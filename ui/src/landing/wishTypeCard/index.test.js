import React from 'react'
import { shallow } from 'enzyme'
import { WishTypeCard } from './index'

describe('WishCard tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<WishTypeCard />)
    expect(wrapper).toMatchSnapshot()
  })
})
