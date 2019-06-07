import React from 'react';
import Landing from './Landing';
import {shallow} from "enzyme"

it('renders without crashing', () => {
  const wrapper = shallow(<Landing/>)

  expect(wrapper.find('p').text()).toEqual("Edit src/landing/Landing.js and save to reload.")
});
