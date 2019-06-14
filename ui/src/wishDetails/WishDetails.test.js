import React from 'react'
import WishDetails from './WishDetails';
import { shallow } from 'enzyme';

describe('Initial Render', () => {
  let wishInfo;
  beforeEach(() => {
    wishInfo = shallow(<WishDetails/>);
  })

  it('renders!', () => {
    expect(wishInfo.exists('.wishInfo'));
  })

})