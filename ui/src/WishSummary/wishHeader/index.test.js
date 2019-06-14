import WishHeader from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('WishHeader tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<WishHeader/>)

    expect(wrapper).toMatchSnapshot()
  })
})