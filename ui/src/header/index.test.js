import { Header } from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('Header tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<Header/>)

    expect(wrapper).toMatchSnapshot()
  })
})
