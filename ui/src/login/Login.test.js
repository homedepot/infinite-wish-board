import React from 'react'
import { Login } from './Login'
import { shallow } from 'enzyme'

describe('When render login page', () => {
  const wrapper = shallow(<Login />)

  it('Should render a Header component', () => {
    expect(wrapper.find('Header').length).toEqual(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should render ValidatedSignInForm', () => {
    expect(wrapper.find('ValidatedSignInForm').length).toEqual(1)
  })

  it('Should render ValidatedSignUpForm when clicked on "Create an Account" button', () => {
    wrapper.instance().toggleForm()
    expect(wrapper.find('ValidatedSignUpForm').length).toEqual(1)
    expect(wrapper.state().showSignIn).toBe(false)
  })
})
