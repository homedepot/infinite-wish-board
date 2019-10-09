import React, { Component } from 'react'
import './styles.scss'
import defaultGif from '../assets/gifs/giphy.gif'

export default class GalaxyScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentGif: null,
            currentWishList: []
        }
    }

    componentDidMount() {
        this.setState({
            currentGif: defaultGif
        })

        this.handleCurrentGif()
    }

    handleCurrentGif = () => {
        // get wish list, find new wish type, update current wish list, update currentGif
    }

    render() {
        return (
            <div id="GalaxyScreen">
                <img src={this.state.currentGif} alt="loading..." />
            </div>
        )
    }

}