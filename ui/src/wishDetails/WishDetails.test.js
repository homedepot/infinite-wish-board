import React from 'react'
import WishDetails from './WishDetails';
import { shallow } from 'enzyme';
import Rocket from '../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'

jest.mock('../services/WishDetailsService', () => ({
  getWishDetails: jest.fn(() => {
    return ({
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
    })
  })
}));

describe('Initial Render', () => {
  let wishInfo;
  beforeEach(() => {
    wishInfo = shallow(<WishDetails childId={'a child id string'}/>);
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
    expect(wishInfo.exists('.wishInfo'));
  })

  describe('Getting image for wish type', () => {
    it('should return rocket image for type GO', () => {
      let currentWishState = wishInfo.instance().state.wishDetails;
      currentWishState.type = 'GO'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      });
      expect(wishInfo.instance().getImageByType()).toEqual(Rocket);
    })

    it('should return aliean image for type MEET', () => {
      let currentWishState = wishInfo.instance().state.wishDetails;
      currentWishState.type = 'MEET'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      });
      expect(wishInfo.instance().getImageByType()).toEqual(Alien);
    })

    it('should return astronaut image for type BE', () => {
      let currentWishState = wishInfo.instance().state.wishDetails;
      currentWishState.type = 'BE'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      });
      expect(wishInfo.instance().getImageByType()).toEqual(Astronaut);
    })
    
    it('should return telescope image for type SEE', () => {
      let currentWishState = wishInfo.instance().state.wishDetails;
      currentWishState.type = 'SEE'
      wishInfo.instance().setState({
        wishDetails: currentWishState
      });
      expect(wishInfo.instance().getImageByType()).toEqual(Telescope);
    })
  })
})
