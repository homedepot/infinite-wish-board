import React from 'react'
import ChildInfo from './ChildInfo'
import { shallow } from 'enzyme'

// noinspection JSAnnotator
describe('Initial Render', () => {
  window.scrollTo = jest.fn(() => {});
  const testName = 'John'
  const age = 5;
  let childInfo;
  let childId = 'some id string'
  beforeEach(() => {
    childInfo = shallow(<ChildInfo name={testName} age={age} childId={childId} />);
  })

  it('renders!', () => {
    expect(childInfo.exists('.childInfo'));
    expect(childInfo.find('.text-name').text()).toEqual(`Hi ${testName}, I have a few questions for you before we can make your wish come true!`);
    expect(childInfo.instance().props.name).toEqual(testName);
    expect(childInfo.instance().state.illness).toEqual('');
    expect(childInfo.instance().state.rocketRotation).toEqual(20);
    expect(childInfo.instance().state.rocketWidth).toEqual(170);
  })

  describe('step updates and progress', () => {

    it('Should update `step` in state', () => {
      expect(childInfo.instance().state.step).toEqual(0);
      childInfo.instance().nextStep();
      expect(childInfo.instance().state.step).toEqual(1);
      childInfo.instance().nextStep();
      expect(childInfo.instance().state.step).toEqual(2);
    })

    it('should update progress at top of page', async () => {
      expect(childInfo.find('.progress').text()).toEqual('1 of 4');

      childInfo.instance().nextStep();
      expect(childInfo.find('.progress').text()).toEqual('2 of 4');

      childInfo.instance().nextStep();
      expect(childInfo.find('.progress').text()).toEqual('3 of 4');

      childInfo.instance().nextStep();
      expect(childInfo.find('.progress').text()).toEqual('4 of 4');
    })
  })

  describe('When user click next button', () => {
    beforeEach(() => {
      childInfo = shallow(<ChildInfo name={testName} age={age}/>);
    })

    it('Should update text on button click', () => {
      let nextButton = childInfo.find('.next-button');
      expect(childInfo.find('.text-name').text()).toEqual(`Hi ${testName}, I have a few questions for you before we can make your wish come true!`);
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
      childInfo = shallow(<ChildInfo name={testName} age={age} childId={childId} />);
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
