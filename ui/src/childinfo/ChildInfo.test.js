import React from 'react'
import ChildInfo from './ChildInfo'
import { shallow } from 'enzyme'

// noinspection JSAnnotator
describe('Initial Render', () => {
  window.scrollTo = jest.fn(() => {});

  let childInfo;
  beforeEach(() => {
    childInfo = shallow(<ChildInfo />);
  })

  it('renders!', () => {

    expect(childInfo.exists('.childInfo'));
    expect(childInfo.find('p').text()).toEqual('Hi what is your name?');
    expect(childInfo.instance().state.name).toEqual("");

  })

  it('Should update `step` in state', () => {
    expect(childInfo.instance().state.step).toEqual(0);
    childInfo.instance().nextStep();
    expect(childInfo.instance().state.step).toEqual(1);
    childInfo.instance().nextStep();
    expect(childInfo.instance().state.step).toEqual(2);
  })

  describe('When user click next button', () => {

    it('Should update text on button click', () => {
      let nextButton = childInfo.find('.next-button');

      expect(childInfo.find('.text-name').text()).toEqual('Hi what is your name?');
      nextButton.simulate('click');
      expect(childInfo.find('.text-name').text()).toEqual('Hi , how old are you?');
      nextButton.simulate('click');
      expect(childInfo.find('.text-name').text()).toEqual('Where are you from?');
      nextButton.simulate('click');
      expect(childInfo.find('.text-name').text()).toEqual('Tell us about your condition');
      nextButton.simulate('click');
      expect(childInfo.find('.text-name').text()).toEqual('Tell us more about your wish!');
      nextButton.simulate('click');
      expect(childInfo.find('.text-name').text()).toEqual('Tell us more about your wish!');
    })
  })
})
