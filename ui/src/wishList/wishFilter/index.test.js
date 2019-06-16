import WishFilter from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('WishFilter tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<WishFilter/>)

    expect(wrapper).toMatchSnapshot()
  })
})
