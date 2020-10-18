import WishSummary from './index'
import React from 'react'
import { shallow } from 'enzyme'
import { getWishes } from '../services/WishDetailsService'
import Wish from './wish'

jest.mock('../services/WishDetailsService')

describe('WishSummary tests', () => {
  const mockWishList = [
    {
      child: {
        name: 'corey',
        hometown: 'smyrna',
        illness: 'non-absorbent',
        age: 15
      },
      sponsor: {
        links: [],
        name: 'Home Depot',
        logo: 'HD'
      },
      _id: '5d070b90db7b540028dea1c3',
      type: 'be',
      details: 'dfehjhgjhgjdf',
      createdAt: '2019-06-17T03:40:00.105Z',
      updatedAt: '2019-06-17T03:40:00.105Z',
      __v: 0
    },
    {
      child: {
        name: 'mina',
        hometown: 'marie',
        illness: 'non-absorbent',
        age: 10
      },
      sponsor: {
        links: [],
        name: 'Home Depot',
        logo: 'HD'
      },
      _id: '5d070b9adb7b540028dea1c4',
      type: 'have',
      details: 'dfehjhgjhgjdf',
      createdAt: '2019-06-17T03:40:10.083Z',
      updatedAt: '2019-06-17T03:40:10.083Z',
      __v: 0
    },
    {
      child: {
        name: 'john',
        hometown: 'sammie',
        illness: 'non-absorbent',
        age: 10
      },
      sponsor: {
        links: [],
        name: 'Home Depot',
        logo: 'HD'
      },
      _id: '5d070ba5db7b540028dea1c5',
      type: 'go',
      details: 'dfehjhgjhgjdf',
      createdAt: '2019-07-18T03:40:21.782Z',
      updatedAt: '2019-07-18T03:40:21.782Z',
      __v: 0
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
    expect(wishes.length).toEqual(3)
  })

  describe('filter by wish types', () => {
    it('should update typeFilters when filterWishesByType called', async () => {
      getWishes.mockImplementation(() => mockWishList)
      const wrapper = shallow(<WishSummary />)
      expect(wrapper.instance().state.typeFilters).toEqual([])
      let clickEvt1 = {
        target: {
          id: 'go',
          checked: true
        }
      }
      await wrapper.instance().filterWishesByType(clickEvt1)
      expect(wrapper.instance().state.typeFilters).toEqual(['go'])
      let clickEvt2 = {
        target: {
          id: 'meet',
          checked: true
        }
      }
      await wrapper.instance().filterWishesByType(clickEvt2)
      expect(wrapper.instance().state.typeFilters).toEqual(['go', 'meet'])
      clickEvt1.target.checked = false
      await wrapper.instance().filterWishesByType(clickEvt1)
      expect(wrapper.instance().state.typeFilters).toEqual(['meet'])
    })
  })

  describe('when filterWishes func called by name', () => {
    let wrapper
    beforeEach(() => {
      getWishes.mockImplementation(() => mockWishList)
      wrapper = shallow(<WishSummary />)
    })

    it('should update filterWishes by name', async () => {
      let clickEvt = {
        target: {
          value: 'corey'
        }
      }

      wrapper.instance().filterWishes(clickEvt)
      expect(wrapper.instance().state.filteredWishes).toEqual([mockWishList[0]])
    })
  })

  describe('when filterWishes func called by hometown', () => {
    let wrapper
    beforeEach(() => {
      getWishes.mockImplementation(() => mockWishList)
      wrapper = shallow(<WishSummary />)
    })

    it('should update filterWishes by hometown', async () => {
      let clickEvt = {
        target: {
          value: 'sammie'
        }
      }

      wrapper.instance().filterWishes(clickEvt)
      expect(wrapper.instance().state.filteredWishes).toEqual([mockWishList[2]])
    })
  })

  describe('when filterWishes func called by sponsor', () => {
    let wrapper
    beforeEach(() => {
      getWishes.mockImplementation(() => mockWishList)
      wrapper = shallow(<WishSummary />)
    })

    it('should update filterWishes by sponsor', async () => {
      let clickEvt = {
        target: {
          value: 'Home Depot'
        }
      }

      wrapper.instance().filterWishes(clickEvt)
      expect(wrapper.instance().state.filteredWishes).toEqual(mockWishList)
    })
  })

  describe('when filterWishes func called by sponsor, but there is not an assigned sponsor', () => {
    let wrapper
    beforeEach(() => {
      getWishes.mockImplementation(() => {
        return [
          {
            _id: '1',
            something: "wrong",
          },
          {
            _id: '2',
            something: "incorrect"
          }
        ]
      })
      wrapper = shallow(<WishSummary />)
    })

    it('should update filterWishes to be an empty array', async () => {
      let clickEvt = {
        target: {
          value: 'Home Depot'
        }
      }

      wrapper.instance().filterWishes(clickEvt)
      expect(wrapper.instance().state.filteredWishes).toEqual([])
    })
  })

  describe('when filterWishes func called by date month', () => {
    let wrapper
    beforeEach(() => {
      getWishes.mockImplementation(() => mockWishList)
      wrapper = shallow(<WishSummary />)
    })

    it('should update filterWishes by date month', async () => {
      let clickEvt = {
        target: {
          value: 'july'
        }
      }

      wrapper.instance().filterWishes(clickEvt)
      expect(wrapper.instance().state.filteredWishes).toEqual([mockWishList[2]])
    })
  })
})
