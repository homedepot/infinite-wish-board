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
        wishType: 'a type'
      })
    })

    it('Should show Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(1)
    })

    it('Should have validFields return true', () => {
      const instance = wrapper.instance();
      const {validAge, validName} = instance.validFields(instance.state.age, instance.state.name);
      expect(validAge).toEqual(true);
      expect(validName).toEqual(true);
    })
  })

  describe('When the states (name, age, and wish type) are invalid', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<CreateWish />)
      wrapper.setState({
        name: '',
        age: 'an age',
        wishType: ''
      })
    })

    it('Should not show Childinfo component', () => {
      expect(wrapper.find(Childinfo).length).toEqual(0)
    })

    it('Should have all validFields return true', () => {
      const instance = wrapper.instance();
      const {validAge, validName} = instance.validFields(instance.state.age, instance.state.name);
      expect(validAge).toEqual(false);
      expect(validName).toEqual(false);
    })
  })
})
