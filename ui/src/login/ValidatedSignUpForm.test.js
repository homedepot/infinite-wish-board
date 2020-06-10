import React from 'react'
import ValidatedSignUpForm from './ValidatedSignUpForm'
import { mount, shallow } from 'enzyme'
import axios from 'axios'

jest.mock('axios')
let wrapper

test('render ValidatedSignUpForm', () => {
  wrapper = shallow(<ValidatedSignUpForm />)
  expect(wrapper).toMatchSnapshot()
})

describe('When I enter a full name ', () => {
  beforeEach(() => {
    wrapper = mount(<ValidatedSignUpForm />)

    const fullnameField = wrapper.find('[data-register-fullname]')

    fullnameField.simulate('change', {
      target: {
        name: 'fullName',
        value: 'John Doe'
      }
    })

    fullnameField.simulate('blur')
  })

  it('should display the full name entered', () => {
    const fullnameField = wrapper.find('[data-register-fullname]')
    expect(fullnameField.prop('value')).toContain('John Doe')
  })
})

describe('When I enter a username ', () => {
  beforeEach(() => {
    wrapper = mount(<ValidatedSignUpForm />)

    const usernameField = wrapper.find('[data-register-username]')

    usernameField.simulate('change', {
      target: {
        name: 'username',
        value: 'john1'
      }
    })

    usernameField.simulate('blur')
  })

  it('should display the username entered', () => {
    const usernameField = wrapper.find('[data-register-username]')
    expect(usernameField.prop('value')).toContain('john1')
  })
})

describe('When I insert a password ', () => {
  beforeEach(() => {
    wrapper = mount(<ValidatedSignUpForm />)

    const passwordField = wrapper.find('[data-register-password]')

    passwordField.simulate('change', {
      target: {
        name: 'password',
        value: 'foo'
      }
    })

    passwordField.simulate('blur')
  })

  it('should display an error if it does not match the criteria', () => {
    setTimeout(() => {
      const errors = wrapper.find('.error')
      expect(errors.length).toBeGreaterThan(0)
    }, 100)
  })

  it('should display the password entered', () => {
    const passwordField = wrapper.find('[data-register-password]')
    expect(passwordField.prop('value')).toContain('foo')
  })
})

describe('ValidatedSignUpForm', () => {
  it('should show error message when invalid data is submitted', async () => {
    const wrapper = shallow(<ValidatedSignUpForm />)
    const values = {
      fullname: 'aswin a',
      username: 'aswin',
      password: 'password123'
    }
    const bag = {
      setSubmitting: jest.fn(),
      resetForm: jest.fn()
    }
    const response = {
      response: {
        data: 'username not available'
      }
    }
    axios.post.mockImplementationOnce(() => Promise.resolve(response))
    await wrapper.instance().onSubmit(values, bag)

    expect(response.response.data).toEqual('username not available')
    expect(wrapper.state('isFormInvalid')).toEqual(true)
    expect(wrapper.state('invalidFormErrorMsg')).toEqual(
      'username not available'
    )
  })

  it('should set form invalid when invalid data is submitted', async () => {
    const wrapper = shallow(<ValidatedSignUpForm />)
    const values = {
      fullname: 'aswin a',
      username: 'aswin',
      password: 'password123'
    }
    const bag = {
      setSubmitting: jest.fn(),
      resetForm: jest.fn()
    }
    const response = {
      message: 'username not available'
    }
    axios.post.mockImplementationOnce(() => Promise.reject(response))
    await wrapper.instance().onSubmit(values, bag)

    expect(response.message).toEqual('username not available')
    expect(wrapper.state('isFormInvalid')).toEqual(true)
  })

  it('should redirect user to landing page when user enters valid data', async () => {
    const historyMock = { push: jest.fn() }
    const wrapper = shallow(<ValidatedSignUpForm history={historyMock} />)
    const values = {
      fullname: 'aswin a',
      username: 'aswin',
      password: 'password123'
    }
    const bag = {
      setSubmitting: jest.fn(),
      resetForm: jest.fn()
    }
    const response = {
      data: 'OK'
    }

    axios.post.mockImplementationOnce(() => Promise.resolve(response))
    await wrapper.instance().onSubmit(values, bag)
    expect(response.data).toEqual('OK')
    expect(historyMock.push).toHaveBeenCalled()
    expect(historyMock.push.mock.calls[0]).toEqual(['/landing'])
  })
})
