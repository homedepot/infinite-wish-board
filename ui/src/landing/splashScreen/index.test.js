import React from 'react'
import { Landing } from './'
import { shallow } from 'enzyme'

describe('Initial Render', () => {
  it('renders!', () => {
    const wrapper = shallow(<Landing />)

    expect(wrapper.text()).toEqual('<Header />My name is  and I am  years old!<WishTypeList />')
  })

  it('should call updateField when name is entered', () => {
    const updateField = jest.fn();
    const selectWishType = jest.fn();
    const props = {
      name: '',
      age: '',
      updateField,
      selectWishType,
    }
    const wrapper = shallow(<Landing {...props} />)

    const name = 'Susan'
    const nameInput = wrapper.find('[data-test="name-input"]')
    const event = {
      target: {
        value: name
      }
    }

    nameInput.simulate('change', event)
    expect(updateField).toHaveBeenCalledWith('name', name)
  })

  it('should call updateField when age is entered', () => {
    const updateField = jest.fn();
    const selectWishType = jest.fn();
    const props = {
      name: '',
      age: '',
      updateField,
      selectWishType,
    }
    const wrapper = shallow(<Landing {...props} />)

    const age = 12
    const ageInput = wrapper.find('[data-test="age-input"]')
    const event = {
      target: {
        value: age
      }
    }

    ageInput.simulate('change', event)
    expect(updateField).toHaveBeenCalledWith('age', age)
  })
})
