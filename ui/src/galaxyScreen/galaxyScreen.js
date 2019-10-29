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
            currentGif: 'MAW_BG.gif'
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
                        currentGif: 'MAW_Rocket.gif' // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.gif'
                            })
                        },
                        13000)
                    })
                } else if (difference[0].type === 'meet') {
                    this.setState({
                        currentGif: 'MAW_To_Meet.gif' // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.gif'
                            })
                        },
                        11000)
                    })
                } else if (difference[0].type === 'be') {
                    this.setState({
                        currentGif: 'MAW_To_Be.gif' // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.gif'
                            })
                        },
                        11000)
                    })
                } else {
                    this.setState({
                        currentGif: 'MAW_Rocket.gif' // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: 'MAW_BG.gif'
                            })
                        },
                        13000)
                    })
                }
            } else {
                this.setState({
                    currentGif: 'MAW_BG.gif'
                })
            }

            this.setState({
                previousWishList: wishes
            })
        }
    }

    getSourceURL = () => {
        if(process.env.REACT_APP_IMAGE_URL) {
            return process.env.REACT_APP_IMAGE_URL + this.state.currentGif
        }
        return `../assets/gifs/${this.state.currentGif}`
    }

    render() {
        return (
            <div id="GalaxyScreen">
                <img className='galaxy-image' src={this.getSourceURL()} alt="loading..." />
            </div>
        )
    }

}