import React, { Component } from 'react'
import Wish from './wish'
import WishHeader from './wishHeader'
import WishFilter from './wishFilter'
import './styles.scss'
import { getWishes } from '../services/WishDetailsService'

export default class WishList extends Component {

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

  filterWishes = (e) => {
  }

  render() {
    const { wishes } = this.state
    const wishList = wishes.map(wish => {
      return <Wish key={wish._id} wish={wish} />
    })

    return (
      <div id="WishList">
        <WishHeader />
        <WishFilter onChangeSearch={this.filterWishes} />
        <ul>
          {wishList}
        </ul>
      </div>
    )
  }
}
