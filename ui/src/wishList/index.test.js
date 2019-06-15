import WishSummary from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('WishSummary tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<WishSummary/>)

    expect(wrapper).toMatchSnapshot()
  })
})
