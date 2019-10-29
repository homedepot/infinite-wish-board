import React, { Component } from 'react'
import './styles.scss'
import { getWishes } from '../services/WishDetailsService'
import backgroundWebm from '../assets/gifs/MAW_BG.webm'
import rocketWebm from '../assets/gifs/MAW_Rocket.webm'
import toBeWebM from '../assets/gifs/MAW_To_Be.webm'
import toMeetWebM from '../assets/gifs/MAW_To_Meet.webm'

export default class GalaxyScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentGif: null,
            previousWishList: [],
            gifLookup: {}
        }
    }

    componentDidMount() {
        this.setState({
            currentGif: 'MAW_BG.webm',
            gifLookup: {
              'MAW_BG.webm': backgroundGif,
              'MAW_Rocket.webm': rocketGif,
              'MAW_To_Be.webm': toBeGif,
              'MAW_To_Meet.webm': toMeetGif
            }
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

            if (difference && difference.length > 0 && this.state.previousWishList.length > 0) {

                if (difference[0].type === 'go') {
                    this.setState({
                        currentGif: 'MAW_Rocket.webm' // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.webm'
                            })
                        },
                        13000)
                    })
                } else if (difference[0].type === 'meet') {
                    this.setState({
                        currentGif: 'MAW_To_Meet.webm' // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.webm'
                            })
                        },
                        11000)
                    })
                } else if (difference[0].type === 'be') {
                    this.setState({
                        currentGif: 'MAW_To_Be.webm' // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.webm'
                            })
                        },
                        11000)
                    })
                } else {
                    this.setState({
                        currentGif: 'MAW_Rocket.webm' // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.webm'
                            })
                        },
                        13000)
                    })
                }
            } else {
                this.setState({
                    currentGif: 'MAW_BG.webm'
                })
            }

            this.setState({
                previousWishList: wishes
            })
        }
    }

    getSourceURL = () => {
        if(process.env.REACT_APP_imageUrl) {
            return process.env.REACT_APP_imageUrl + this.state.currentGif
        }
        return this.state.gifLookup[this.state.currentGif]
    }

    render() {
        return (
            <div className="fullscreen-bg">
                <video loop muted autoPlay className="fullscreen-bg__video">
                    <source src={this.state.currentGif} type="video/webm" />
                </video>
            </div>
        )
    }

}
