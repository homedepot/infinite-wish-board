import React from 'react'
import GalaxyScreen from './GalaxyScreen'
import { shallow } from 'enzyme'
import { getWishes } from '../services/WishDetailsService'
import backgroundGif from '../assets/gifs/MAW_BG.gif'
import rocketGif from '../assets/gifs/MAW_Rocket.gif'
import toBeGif from '../assets/gifs/MAW_To_Be.gif'
import toMeetGif from '../assets/gifs/MAW_To_Meet.gif'

jest.mock('../services/WishDetailsService', () => ({
    getWishes: jest.fn(() => {
        return ([
            {
                _id: '1',
                type: 'go'
            },
            {
                _id: '2',
                type: 'be'
            }
        ])
    })
}));

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

    describe('When handleCurrentGif is called', () => {

        beforeEach(() => {
            component.setState({
                previousWishList: [
                    {
                        _id: '1',
                        type: 'go'
                    },
                    {
                        _id: '2',
                        type: 'be'
                    }
                ]
            })
        })

        it('should always show `rocket` GIF after receiving `go` wish type', async () => {
            const wishes = [
                {
                    _id: '1',
                    type: 'go'
                },
                {
                    _id: '2',
                    type: 'be'
                },
                {
                    _id: '3',
                    type: 'go'
                }
            ]

            getWishes.mockImplementation(() => {
                return wishes
            })          

            await component.instance().handleCurrentGif()
            expect(component.state().currentGif).toEqual(rocketGif)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `to meet` GIF after receiving `meet` wish type', async () => {
            const wishes = [
                {
                    _id: '1',
                    type: 'go'
                },
                {
                    _id: '2',
                    type: 'be'
                },
                {
                    _id: '3',
                    type: 'meet'
                }
            ]

            getWishes.mockImplementation(() => {
                return wishes
            })          

            await component.instance().handleCurrentGif()
            expect(component.state().currentGif).toEqual(toMeetGif)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `to be` GIF after receiving `be` wish type', async () => {
            const wishes = [
                {
                    _id: '1',
                    type: 'go'
                },
                {
                    _id: '2',
                    type: 'be'
                },
                {
                    _id: '3',
                    type: 'be'
                }
            ]

            getWishes.mockImplementation(() => {
                return wishes
            })          

            await component.instance().handleCurrentGif()
            expect(component.state().currentGif).toEqual(toBeGif)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `rocket` GIF after receiving any unmatched wish type', async () => {
            const wishes = [
                {
                    _id: '1',
                    type: 'go'
                },
                {
                    _id: '2',
                    type: 'be'
                },
                {
                    _id: '3',
                    type: 'something'
                }
            ]

            getWishes.mockImplementation(() => {
                return wishes
            })          

            await component.instance().handleCurrentGif()
            expect(component.state().currentGif).toEqual(rocketGif)
            expect(component.state().previousWishList).toEqual(wishes)
        })
    })
})
