import ImgPlaceholder from './index'
import React from 'react'
import { shallow } from 'enzyme'

describe('ImgPlaceholder tests', () => {
  it('snapshot', () => {
    const wrapper = shallow(<ImgPlaceholder/>)

    expect(wrapper).toMatchSnapshot()
  })
})
