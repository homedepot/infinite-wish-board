import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { Route } from 'react-router-dom'
import Login from '../login/Login'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishList from '../wishList'
import WishDetails from '../wishDetails/WishDetails';

describe('Default routing behavior', () => {
  it('renders the login page by default', () => {
    const wrapper = shallow(<App />)

    const loginRoute = wrapper
      .find(Route)
      .at(5)
      .props()

    expect(loginRoute.path).toEqual('/')
    expect(typeof loginRoute.render).toEqual('function')
    expect(loginRoute.render().type).toEqual(Login)

    const logoutRoute = wrapper
      .find(Route)
      .at(4)
      .props()

    expect(logoutRoute.path).toEqual('/logout')
    expect(typeof logoutRoute.render).toEqual('function')
    expect(logoutRoute.render().type).toEqual(Login);

    const wishDetailsRoute = wrapper
      .find(Route)
      .at(3)
      .props()

    expect(wishDetailsRoute.path).toEqual('/wish-summary/:id')
    expect(typeof wishDetailsRoute.render).toEqual('function')
    expect(wishDetailsRoute.render().type).toEqual(WishDetails)

    const wishCurationRoute = wrapper
      .find(Route)
      .at(2)
      .props()

    expect(wishCurationRoute.path).toEqual('/wish-summary')
    expect(typeof wishCurationRoute.render).toEqual('function')
    expect(wishCurationRoute.render().type).toEqual(WishList)

    const landingRoute = wrapper
      .find(Route)
      .at(1)
      .props()

    expect(landingRoute.path).toEqual('/landing')
    expect(landingRoute.component).toEqual(CreateWish)

    const childInfoRoute = wrapper
      .find(Route)
      .at(0)
      .props()

    expect(childInfoRoute.path).toEqual('/child-info')
    expect(childInfoRoute.component).toEqual(ChildInfo)
  })

  describe('App state', () => {
    it('should set username', () => {
      const wrapper = shallow(<App />)
      const username = 'username1'
      wrapper.instance().setSignedInUser(username)
      expect(wrapper.instance().state.username).toEqual(username)
    })
  })
})
