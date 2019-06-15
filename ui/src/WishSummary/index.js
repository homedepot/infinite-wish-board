import React, { Component } from 'react'
import Wish from './wish'
import WishHeader from './wishHeader'
import WishFilter from './wishFilter'
import './styles.scss'
import { getWishes } from '../services/WishDetailsService'

export default class WishSummary extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wishes: []
    }
  }

  componentDidMount = async () => {
    const wishes = await getWishes()
    this.setState({ wishes })
  }

  render() {
    return (
      <div id="WishSummary">
        <WishHeader />
        <WishFilter />
        <Wish />
        <Wish />
        <Wish />
      </div>
    )
  }
}
