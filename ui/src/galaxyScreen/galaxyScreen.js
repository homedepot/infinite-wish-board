import React, { Component } from 'react'
import './styles.scss'
import { getWishes } from '../services/WishDetailsService'
import defaultGif from '../assets/gifs/giphy.gif'

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
            // currentGif: defaultGif
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
            if (difference && difference.length > 0) {
                console.log(difference[0].type)

                if (difference[0].type === 'be') {
                    this.setState({
                        currentGif: defaultGif
                    })
                }
            }

            this.setState({
                previousWishList: wishes
            })
        }
    }

    render() {
        return (
            <div id="GalaxyScreen">
                <img src={this.state.currentGif} alt="loading..." />
            </div>
        )
    }

}