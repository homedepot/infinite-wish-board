import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { Route } from 'react-router-dom'
import Landing from '../landing/Landing'
import Login from '../login/Login'
import ChildInfo from '../childinfo/ChildInfo'

describe('Default routing behavior', () => {
  it('renders the login page by default', () => {
    const wrapper = shallow(<App />)

    let loginRoute = wrapper
      .find(Route)
      .at(2)
      .props()

    expect(loginRoute.path).toEqual('/')
    expect(loginRoute.component).toEqual(Login)

    let landingRoute = wrapper
      .find(Route)
      .at(1)
      .props()

    expect(landingRoute.path).toEqual('/landing')
    expect(landingRoute.component).toEqual(Landing)

    let childInfoRoute = wrapper
      .find(Route)
      .at(0)
      .props()

    expect(childInfoRoute.path).toEqual('/child-info')
    expect(childInfoRoute.component).toEqual(ChildInfo)
  })



})
