import WishSummary from './index'
import React from 'react'
import { shallow } from 'enzyme'
import { getWishes } from '../services/WishDetailsService'
import Wish from './wish'

jest.mock('../services/WishDetailsService')

describe('WishSummary tests', () => {
  const mockWishList = [
    {
      'child': {
        'name': 'Jerel Weber',
        'age': 5,
        'hometown': 'North Robertside',
        'illness': 'SMTP'
      },
      'sponsor': {
        'links': []
      },
      '_id': '5d0528c11170183ea576e3da',
      'type': 'be',
      'details': 'overriding calculating Shirt',
      '__v': 0
    },
    {
      'child': {
        'name': 'Meta Brakus',
        'age': 16,
        'hometown': 'Rauburgh',
        'illness': 'Exclusive'
      },
      'sponsor': {
        'links': []
      },
      '_id': '5d0528c11170183ea576e3db',
      'type': 'meet',
      'details': 'Officer application Borders',
      '__v': 0
    }
  ]

  it('snapshot', () => {
    const wrapper = shallow(<WishSummary />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should display list of wishes', async () => {
    getWishes.mockImplementation(() => mockWishList)

    const wrapper = await shallow(<WishSummary />)
    const wishes = wrapper.find(Wish)
    expect(wishes.length).toEqual(2)
  })

  describe('filter by wish types', () => {
    it('should update wishes when filterWishes called', async () => {
      getWishes.mockImplementation(() => mockWishList)
      const wrapper = shallow(<WishSummary />)
      expect(wrapper.instance().state.typeFilters).toEqual([])
      let clickEvt1 = {
        target: {
          id: 'go',
          checked: true
        }
      }
      await wrapper.instance().filterWishes(clickEvt1);
      expect(wrapper.instance().state.typeFilters).toEqual(['go']);
      let clickEvt2 = {
        target: {
          id: 'meet',
          checked: true
        }
      }
      await wrapper.instance().filterWishes(clickEvt2);
      expect(wrapper.instance().state.typeFilters).toEqual(['go', 'meet']);
      clickEvt1.target.checked = false
      await wrapper.instance().filterWishes(clickEvt1);
      expect(wrapper.instance().state.typeFilters).toEqual(['meet']);
    });
  })

})
