import CreateWish from './CreateWish'
import { shallow } from 'enzyme'
import React from 'react'
import { WishType } from './wishType'
import Childinfo from '../childinfo/ChildInfo'

describe('CreateWish tests', () => {
  it('should update the state for the desired field', () => {
    const wrapper = shallow(<CreateWish />)

    const name = 'Susan'
    wrapper.instance().updateField('name', name)
    expect(wrapper.state().name).toEqual(name)

    const age = 14
    wrapper.instance().updateField('age', age)
    expect(wrapper.state().age).toEqual(age)
  })

  it('should set the wishType when selectWishType is called', () => {
    const wrapper = shallow(<CreateWish />)

    const wishType = WishType.HAVE
    wrapper.instance().selectWishType(wishType)
    expect(wrapper.state().wishType).toEqual(wishType)
  })

  describe('When name, age, and wish type are present and valid', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CreateWish />)
      wrapper.setState({
        name: 'a name',
        age: '14',
        wishType: 'a type',
        showChildInfo: false
      })
    })

    it('Should hide Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(0)
    })

    it('Should show Childinfo component', () => {
      wrapper.instance().selectWishType('GO')
      expect(wrapper.find(Childinfo).length).toEqual(1)
    })

    it('Should have all values from validFields return true', () => {
      const instance = wrapper.instance();
      const {validAge, validName, ageTouched, nameTouched} = instance.validFields(instance.state.age, instance.state.name);
      expect(validAge).toEqual(true);
      expect(validName).toEqual(true);
      expect(nameTouched).toEqual(true);
      expect(ageTouched).toEqual(true);
    })
  })

  describe('When the age is invalid', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CreateWish />)
      wrapper.setState({
        name: 'Chris',
        age: '19',
        wishType: ''
      })
    })

    it('Should not show Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(0)
    })

    it('Should have validAge from validFields return false', () => {
      const instance = wrapper.instance();
      const {validAge, validName} = instance.validFields(instance.state.age, instance.state.name);
      expect(validAge).toEqual(false);
      expect(validName).toEqual(true);
    })
  })

  describe('When the name is invalid', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CreateWish />)
      wrapper.setState({
        name: '',
        age: '14',
        wishType: ''
      })
    })

    it('Should not show Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(0)
    })

    it('Should have validName from validFields return false', () => {
      const instance = wrapper.instance();
      const {validAge, validName} = instance.validFields(instance.state.age, instance.state.name);
      expect(validAge).toEqual(true);
      expect(validName).toEqual(false);
    })
  })

  describe('When the name and age are invalid & untouched', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CreateWish />)
      wrapper.setState({
        name: '',
        age: '',
        wishType: ''
      })
    })

    it('Should not show Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(0)
    })

    it('Should have validFields return false for everything', () => {
      const instance = wrapper.instance();
      const {validAge, validName, ageTouched, nameTouched} = instance.validFields(instance.state.age, instance.state.name);
      expect(validAge).toEqual(false);
      expect(validName).toEqual(false);

      expect(ageTouched).toEqual(false);
      expect(nameTouched).toEqual(false);
    })
  })

  describe('When the wishType is invalid', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CreateWish />)
      wrapper.setState({
        name: '',
        age: '',
        wishType: ''
      })
    })

    it('Should not show Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(0)
    })
  })
})
