import React from 'react'
import ChildInfo from './ChildInfo'
import { shallow } from 'enzyme'

// noinspection JSAnnotator
describe('Initial Render', () => {
  window.scrollTo = jest.fn(() => {});

  let childInfo;
  let childId = 'some id string'
  beforeEach(() => {
    childInfo = shallow(<ChildInfo childId={childId} />);
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

  describe('When `showWishDetails` in state is true', () => {
    beforeEach(() => {
      childInfo = shallow(<ChildInfo childId={childId} />);
      childInfo.instance().setState({
        showWishDetails: true
      })
    })

    it('Should show WishDetails component', () => {
      expect(childInfo.find('WishDetails').length).toEqual(1)
    })
  })

  describe('When user on confirmation page and click blast off the rocket', () => {

    beforeEach(() => {
      childInfo = shallow(<ChildInfo childId={childId} />);
      childInfo.instance().setState({
        showConfirmation: true,
        isBlastOff: false
      })
    })

    it('Should update the `rocketRotation` and `rocketWidth` in state', (done) => {
      childInfo.find('button').simulate('click')
      setTimeout(() => {
        expect(childInfo.instance().state.rocketRotation).toEqual(-45)
        expect(childInfo.instance().state.rocketWidth).toEqual(250)
        done()
      }, 3000);
    })
  });
});
