import React from 'react'
import { Landing } from './'
import { shallow } from 'enzyme'

describe('Initial Render', () => {
  it('renders!', () => {
    const wrapper = shallow(<Landing />)

    expect(wrapper.text()).toEqual('Welcome to the Hackathon Landing Page')
  })
})
