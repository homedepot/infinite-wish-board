import React from 'react'
import GalaxyScreen from './GalaxyScreen'
import { shallow } from 'enzyme'


describe('GalaxyScreen component', () => {

    const component = shallow(
        <GalaxyScreen />
    )

    it('should render a GalaxyScreen component', () => {
        expect(component.length).toEqual(1)
    })

    it('should render a galaxy image', () => {
        expect(component.find('.galaxy-image').length).toEqual(1)
    })
})
