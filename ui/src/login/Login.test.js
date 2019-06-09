import React from 'react'
import { Login } from './Login'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const wrapper = shallow(<Login />)

  expect(wrapper.find('form').text()).toContain('Register a user')
})
