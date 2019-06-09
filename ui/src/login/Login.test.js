import React from 'react'
import { Login } from './Login'
import { shallow } from 'enzyme'
import axios from 'axios'

jest.mock('axios', () => {
  return {
    post: jest.fn(() => Promise.reject('Mock me!!!')),
    create: () => ({
      post: () => Promise.reject('Mock me!!!')
    })
  }
})

describe('Registration', () => {
  beforeEach(() => {
    axios.post = () => Promise.resolve('success!')
  })

  it('Returns 200 when successfully registering a new user', async () => {
    const wrapper = shallow(<Login />)

    wrapper
      .find('[data-register-username]')
      .simulate('change', { target: { value: 'good-username' } })

    wrapper
      .find('[data-register-password]')
      .simulate('change', { target: { value: 'good-password' } })

    let preventDefaultMock = jest.fn()
    wrapper
      .find('[data-register-form]')
      .simulate('submit', { preventDefault: preventDefaultMock })

    await axios.post()

    expect(preventDefaultMock).toHaveBeenCalled()
    expect(wrapper.state().username).toEqual('')
    expect(wrapper.state().password).toEqual('')
  })
})

describe('Login', () => {
  beforeEach(() => {
    axios.create = () => ({
      post: () => Promise.resolve('success!')
    })
  })

  it('Returns 200 when successfully registering a new user', async () => {
    const fakeHistory = []
    const wrapper = shallow(<Login history={fakeHistory} />)

    wrapper
      .find('[data-login-username]')
      .simulate('change', { target: { value: 'good-username' } })

    wrapper
      .find('[data-login-password]')
      .simulate('change', { target: { value: 'good-password' } })

    let preventDefaultMock = jest.fn()
    wrapper
      .find('[data-login-form]')
      .simulate('submit', { preventDefault: preventDefaultMock })

    await axios.create().post()

    expect(preventDefaultMock).toHaveBeenCalled()
    expect(fakeHistory).toEqual(['/landing'])
  })
})
