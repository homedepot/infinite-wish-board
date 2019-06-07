import React from 'react';
import App from './App';
import {shallow} from "enzyme"

it('renders without crashing', () => {
  const wrapper = shallow(<App/>)

  expect(wrapper.find('p').text()).toEqual("Edit src/app/App.js and save to reload.")
});
