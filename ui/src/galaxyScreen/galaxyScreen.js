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
            previousWishList: []
        }
    }

    componentDidMount() {
        this.setState({
            currentGif: backgroundWebm
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
                        currentGif: rocketWebm // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundWebm
                            })
                        },
                        13000)
                    })
                } else if (difference[0].type === 'meet') {
                    this.setState({
                        currentGif: toMeetWebM // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundWebm
                            })
                        },
                        11000)
                    })
                } else if (difference[0].type === 'be') {
                    this.setState({
                        currentGif: toBeWebM // 11 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundWebm
                            })
                        },
                        11000)
                    })
                } else {
                    this.setState({
                        currentGif: backgroundWebm // 13 seconds
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                currentGif: backgroundWebm
                            })
                        },
                        13000)
                    })
                }
            } else {
                this.setState({
                    currentGif: backgroundWebm
                })
            }

            this.setState({
                previousWishList: wishes
            })
        }
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