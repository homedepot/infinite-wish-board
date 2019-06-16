import Wish from './'
import React from 'react'
import { shallow } from 'enzyme'

describe('Wish tests', () => {
  const wish = {
    child: {
      name: 'Jerel Weber',
      age: 5,
      hometown: 'North Robertside',
      illness: 'SMTP'
    },
    sponsor: {
      links: []
    },
    _id: '5d0528c11170183ea576e3da',
    type: 'be',
    details: 'overriding calculating Shirt',
    __v: 0
  }

  it('snapshot', () => {
    const wrapper = shallow(<Wish wish={wish} />)

    expect(wrapper).toMatchSnapshot()
  })
})

describe('handle wish click', () => {
  const wish = {
    child: {
      name: 'Jerel Weber',
      age: 5,
      hometown: 'North Robertside',
      illness: 'SMTP'
    },
    sponsor: {
      links: []
    },
    _id: '5d0528c11170183ea576e3da',
    type: 'be',
    details: 'overriding calculating Shirt',
    __v: 0
  }

  it('should navigate user to wish Details page', () => {
    const historyMock = { push: jest.fn() };
    const wrapper = shallow(<Wish history={historyMock} wish={wish} />);
    wrapper.find('li').simulate('click');
    expect(historyMock.push.mock.calls[0]).toEqual([('/wish-summary/5d0528c11170183ea576e3da')]);
  })
});