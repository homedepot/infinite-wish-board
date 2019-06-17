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
      wishes: [],
      typeFilters: []
    }
  }

  async componentDidMount() {
    const wishes = await getWishes()
    this.setState({ wishes })
  }

  filterWishes = async (e) => {
    let { typeFilters } = this.state
    if(e.target.checked) {
      typeFilters.push(e.target.id)
    }
    else {
      typeFilters = typeFilters.filter(type => type !== e.target.id)
    }
    let wishes = await getWishes(typeFilters);
    this.setState({
      wishes,
      typeFilters
    })
  }

  render() {
    const { wishes } = this.state
    const wishList = wishes.map(wish => {
      return <Wish key={wish._id} wish={wish} history={this.props.history} />
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
