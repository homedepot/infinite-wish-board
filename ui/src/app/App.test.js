import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { Route } from 'react-router-dom'
import Landing from '../landing/Landing'
import Login from '../login/Login'

describe('Default routing behavior', () => {
  it('renders the login page by default', () => {
    const wrapper = shallow(<App />)

    let loginRoute = wrapper
      .find(Route)
      .at(1)
      .props()

    expect(loginRoute.path).toEqual('/')
    expect(loginRoute.component).toEqual(Login)

    let landingRoute = wrapper
      .find(Route)
      .at(0)
      .props()

    expect(landingRoute.path).toEqual('/landing')
    expect(landingRoute.component).toEqual(Landing)
  })
})
