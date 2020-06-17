import React from 'react'
import WishDetails from './WishDetails'
import { shallow } from 'enzyme'
import Rocket from '../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'
import axios from 'axios';

jest.mock('../services/WishDetailsService', () => ({
  editAWish: jest.fn(() => {
    return ({
      _id: 'mock child id',
      child: {
        name: 'child name',
        hometown: 'Round Rock',
        illness: '',
        age: ''
      },
      type: '',
      details: '',
      sponser: {
        name: '',
        logo: '',
        links: []
      },
      createdAt: '',
      updatedAt: ''
    })
  }),
  getWishDetails: jest.fn(() => {
    return {
      id: '',
      child: {
        name: 'child name',
        hometown: '',
        illness: '',
        age: ''
      },
      type: '',
      details: '',
      sponsor: {
        name: '',
        logo: '',
        links: []
      },
      createdAt: '',
      updatedAt: ''
    }
  })
}))

describe('Initial Render', () => {
  let wishInfo
  beforeEach(() => {
    wishInfo = shallow(<WishDetails childId={'a child id string'} match={{params: {id: 1}}} />)
    wishInfo.instance().setState({
      id: '',
      wishDetails: {
        id: '',
        child: {
          firstName: '',
          lastName: ' ',
          hometown: '',
          illness: '',
          age: ''
        },
        type: '',
        details: '',
        sponsor: {
          name: '',
          logo: '',
          links: []
        },
        createdAt: '',
        updatedAt: ''
      }
    })
  })

  it('renders!', () => {
    expect(wishInfo.exists('.wishInfo'))
  })

  it('should allow the hometown field to be edited', async () => {
    const hometownInput = wishInfo.find('[data-test="hometown-input"]')
    const instance = wishInfo.instance();
    const updateHometownSpy = jest.spyOn(instance, 'updateHometown')
    const goToWishSummarySpy = jest.spyOn(instance, 'goToWishSummary')

    let event = {
      target: {
        value: 'Round Rock'
      }
    }
    hometownInput.simulate('change', event)
    expect(instance.state.wishDetails.child.hometown).toEqual('Round Rock');

    const wish = {
      child: instance.state.wishDetails.child,
      type: instance.state.wishDetails.type,
      details: instance.state.wishDetails.details
    }
 
    hometownInput.simulate('blur', event)
    axios.put = jest.fn(() => Promise.resolve({ data: wish }));
    expect(updateHometownSpy).toHaveBeenCalled()

    const goToSummaryLink = wishInfo.find('[data-test="go-to-summary-link"]')
    goToSummaryLink.simulate('click', event)
    expect(goToWishSummarySpy).toHaveBeenCalled()
  })

  describe('Getting image for wish type', () => {
    it('should return rocket image for type GO', () => {
      let currentWishState = wishInfo.instance().state.wishDetails
      currentWishState.type = 'GO'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      })
      expect(wishInfo.instance().getImageByType()).toEqual(Rocket)
    })

    it('should return aliean image for type MEET', () => {
      let currentWishState = wishInfo.instance().state.wishDetails
      currentWishState.type = 'MEET'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      })
      expect(wishInfo.instance().getImageByType()).toEqual(Alien)
    })

    it('should return astronaut image for type BE', () => {
      let currentWishState = wishInfo.instance().state.wishDetails
      currentWishState.type = 'BE'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      })
      expect(wishInfo.instance().getImageByType()).toEqual(Astronaut)
    })

    it('should return telescope image for type HAVE', () => {
      let currentWishState = wishInfo.instance().state.wishDetails
      currentWishState.type = 'HAVE'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      })
      expect(wishInfo.instance().getImageByType()).toEqual(Telescope)
    })
  })
})
