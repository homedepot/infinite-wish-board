import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { PrivateRoute, TemporaryRoute } from './Routing'
import Login from '../login/Login'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishList from '../wishList'
import WishDetails from '../wishDetails/WishDetails';
import GalaxyScreen from '../galaxyScreen/galaxyScreen'

describe('Default routing behavior', () => {
  it('renders the login page by default', () => {
    const wrapper = shallow(<App />)

    let landingRoute = wrapper
      .find(PrivateRoute)
      .at(0)
    
    expect(landingRoute.path).toEqual('/')
    expect(landingRoute.component).toEqual(CreateWish)
    
    const galaxyRoute = wrapper
      .find(Route)
      .at(6)
      .props()

    expect(galaxyRoute.path).toEqual('/galaxy')
    expect(galaxyRoute.component).toEqual(GalaxyScreen)

    const logoutRoute = wrapper
      .find(PrivateRoute)
      .at(4)
      .props()

    expect(logoutRoute.path).toEqual('/logout')
    expect(logoutRoute.component).toEqual(Login)

    let childInfoRoute = wrapper
      .find(PrivateRoute)
      .at(1)
      .props()

    expect(childInfoRoute.path).toEqual('/child-info')
    expect(childInfoRoute.component).toEqual(ChildInfo)

    let wishCurationRoute = wrapper
      .find(PrivateRoute)
      .at(2)
      .props()

    expect(wishCurationRoute.path).toEqual('/wish-summary')
    expect(wishCurationRoute.component).toEqual(WishList)

    let wishDetailsRoute = wrapper
      .find(PrivateRoute)
      .at(3)
      .props()

    expect(wishDetailsRoute.path).toEqual('/wish-summary/:id')
    expect(wishDetailsRoute.component).toEqual(WishDetails)

    let loginRoute = wrapper
      .find(TemporaryRoute)
      .at(0)
      .props()

    expect(loginRoute.path).toEqual('/login')
    expect(loginRoute.component).toEqual(Login)

  })
})
