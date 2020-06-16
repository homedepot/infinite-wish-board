import React from 'react'
import GalaxyScreen from './galaxyScreen'
import { shallow } from 'enzyme'
import { getWishes } from '../services/WishDetailsService'
import backgroundWebm from '../assets/gifs/MAW_BG.webm'
import toGoWebm from '../assets/gifs/MAW_To_Go.webm'
import toBeWebm from '../assets/gifs/MAW_To_Be.webm'
import toMeetWebm from '../assets/gifs/MAW_To_Meet.webm'
import toHaveWebm from '../assets/gifs/MAW_To_Have.webm'

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

    beforeEach(() => {
       component.instance().refs = {
            video: {
                load: () => {},
                play: () => {}
            }
        }
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


    it('should render a GalaxyScreen component', () => {
        expect(component.length).toEqual(1)
    })

    describe('when image URL is defined', () => {
        beforeEach(() => {
            process.env.REACT_APP_imageUrl = 'testing'
        })

        afterEach(() => {
            process.env.REACT_APP_imageUrl = undefined
        })

        it('should return a source url from imageUrl when defined', () => {
            expect(component.instance().getSourceURL('MAW_BG.webm')).toEqual('testingMAW_BG.webm')
        })
    })
    describe('on page load', () => {
        it('should render the background video', async () => {
            await component.instance().handleCurrentWebm()
            expect(component.state().currentWebm).toEqual(backgroundWebm)
        })
    })

    describe('When handleCurrentWebm is called', () => {
        it('should always show `to go` webm after receiving `go` wish type', async () => {
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

            await component.instance().handleCurrentWebm()
            expect(component.state().currentWebm).toEqual(toGoWebm)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `to meet` webm after receiving `meet` wish type', async () => {
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

            await component.instance().handleCurrentWebm()
            expect(component.state().currentWebm).toEqual(toMeetWebm)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `to be` webm after receiving `be` wish type', async () => {
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

            await component.instance().handleCurrentWebm()
            expect(component.state().currentWebm).toEqual(toBeWebm)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `to have` webm after receiving `have` wish type', async () => {
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
                    type: 'have'
                }
            ]

            getWishes.mockImplementation(() => {
                return wishes
            })          

            await component.instance().handleCurrentWebm()
            expect(component.state().currentWebm).toEqual(toHaveWebm)
            expect(component.state().previousWishList).toEqual(wishes)
        })

        it('should always show `to go` webm after receiving any unmatched wish type', async () => {
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

            await component.instance().handleCurrentWebm()
            expect(component.state().currentWebm).toEqual(toGoWebm)
            expect(component.state().previousWishList).toEqual(wishes)
        })
    })
})
