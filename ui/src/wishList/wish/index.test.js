import Wish from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('Wish tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<Wish/>)

    expect(wrapper).toMatchSnapshot()
  })
})
