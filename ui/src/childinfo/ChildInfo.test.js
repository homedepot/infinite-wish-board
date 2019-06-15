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
    expect(childInfo.instance().state.rocketRotation).toEqual(20);
    expect(childInfo.instance().state.rocketWidth).toEqual(170);
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
      expect(childInfo.find('.text-name').length).toEqual(0);
      expect(childInfo.instance().state.showConfirmation).toBeTruthy();
    })
  })

  describe('When user on confirmation page and click blast off the rocket', () => {

    beforeEach(() => {
      childInfo = shallow(<ChildInfo />);
      childInfo.instance().setState({
        showConfirmation: true,
        isBlastOff: false
      })
    })

    it('Should update the `rocketRotation` and `rocketWidth` in state', () => {
      childInfo.find('button').simulate('click')
      setTimeout(() => {
        expect(childInfo.instance().state.rocketRotation).toEqual(-45)
        expect(childInfo.instance().state.rocketWidth).toEqual(250)
      }, 500);
    })

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
  });
});
