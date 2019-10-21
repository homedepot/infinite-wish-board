import React, { Component } from 'react'
import './styles.scss'
import { getWishes } from '../services/WishDetailsService'
import backgroundGif from '../assets/gifs/MAW_BG.gif'
import rocketGif from '../assets/gifs/MAW_Rocket.gif'
import toBeGif from '../assets/gifs/MAW_To_Be.gif'
import toMeetGif from '../assets/gifs/MAW_To_Meet.gif'

export default class GalaxyScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentGif: null,
            previousWishList: []
        }
    }

    componentDidMount() {
        this.setState({
            currentGif: backgroundGif
        },
        () => {
            setInterval(() => {
                this.handleCurrentGif()
            },
            3000)
        })
    }

    handleCurrentGif = async () => {
        const wishes = await getWishes()
        if (JSON.stringify(this.state.previousWishList) !== JSON.stringify(wishes)) {
            const difference = wishes.filter(wish => !this.state.previousWishList.some(prevWish => wish._id === prevWish._id));

            // console.log(this.state.previousWishList)
            // console.log(difference)
            if (difference && difference.length > 0 && this.state.previousWishList.length > 0) {

                if (difference[0].type === 'go') {
                    this.setState({
                        currentGif: rocketGif // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundGif
                            })
                        },
                        13000)
                    })
                } else if (difference[0].type === 'meet') {
                    this.setState({
                        currentGif: toMeetGif // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundGif
                            })
                        },
                        11000)
                    })
                } else if (difference[0].type === 'be') {
                    this.setState({
                        currentGif: toBeGif // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundGif
                            })
                        },
                        11000)
                    })
                } else {
                    this.setState({
                        currentGif: rocketGif // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundGif
                            })
                        },
                        13000)
                    })
                }
            } else {
                this.setState({
                    currentGif: backgroundGif
                })
            }

            this.setState({
                previousWishList: wishes
            })
        }
    }

    render() {
        return (
            <div id="GalaxyScreen">
                <img className='galaxy-image' src={this.state.currentGif} alt="loading..." />
            </div>
        )
    }

}