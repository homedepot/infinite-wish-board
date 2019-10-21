import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { Route } from 'react-router-dom'
import Login from '../login/Login'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishList from '../wishList'
import WishDetails from '../wishDetails/WishDetails';
import GalaxyScreen from '../galaxyScreen/GalaxyScreen'

describe('Default routing behavior', () => {
  it('renders the login page by default', () => {
    const wrapper = shallow(<App />)

    const galaxyRoute = wrapper
      .find(Route)
      .at(6)
      .props()

    expect(galaxyRoute.path).toEqual('/galaxy')
    expect(galaxyRoute.component).toEqual(GalaxyScreen)

    const loginRoute = wrapper
      .find(Route)
      .at(5)
      .props()

    expect(loginRoute.path).toEqual('/')
    expect(loginRoute.component).toEqual(Login)

    const logoutRoute = wrapper
      .find(Route)
      .at(4)
      .props()

    expect(logoutRoute.path).toEqual('/logout')
    expect(logoutRoute.component).toEqual(Login)

    const wishDetailsRoute = wrapper
      .find(Route)
      .at(3)
      .props()

    expect(wishDetailsRoute.path).toEqual('/wish-summary/:id')
    expect(wishDetailsRoute.component).toEqual(WishDetails)

    const wishCurationRoute = wrapper
      .find(Route)
      .at(2)
      .props()

    expect(wishCurationRoute.path).toEqual('/wish-summary')
    expect(wishCurationRoute.component).toEqual(WishList)

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
})
