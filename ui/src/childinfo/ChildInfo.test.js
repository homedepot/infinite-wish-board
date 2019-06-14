import React from 'react'
import ChildInfo from './ChildInfo'
import { shallow } from 'enzyme'

// noinspection JSAnnotator
describe('Initial Render', () => {
  let childInfo
  beforeEach( () => {
    childInfo = shallow(<ChildInfo />)
  })

  it('renders!', () => {

    expect(childInfo.exists('.childInfo'));
    expect(childInfo.find('p').text()).toEqual('Hi what is your name?');
    expect(childInfo.instance().state.name).toEqual("");

  })

  it('stepUpdate!', () => {
    expect(childInfo.instance().state.step).toEqual(0);
    childInfo.instance().nextStep();
    expect(childInfo.instance().state.step).toEqual(1);

  })
})
