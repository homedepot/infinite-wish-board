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
      typeFilters: [],
      filteredWishes: []
    }
  }

  async componentDidMount() {
    const wishes = await getWishes()
    this.setState({ wishes, filteredWishes: wishes })
  }

  filterWishesByType = async (e) => {
    let { typeFilters } = this.state
    if(e.target.checked) {
      typeFilters.push(e.target.id)
    }
    else {
      typeFilters = typeFilters.filter(type => type !== e.target.id)
    }
    let filteredWishes = await getWishes(typeFilters);
    this.setState({
      filteredWishes,
      typeFilters
    })
  }

  filterWishes = (e) => {
    const wishFilter = e.target.value;
    let filteredWishes = this.state.wishes;
    filteredWishes = filteredWishes.filter((wish) => {
      const child = wish.child.name ? wish.child.name.toLowerCase() : "";
      const sponsor = wish.sponsor.name ? wish.sponsor.name.toLowerCase() : "";
      const hometown = wish.child.hometown ? wish.child.hometown.toLowerCase() : "";
      let wishItem = child + sponsor + hometown;
      
      return wishItem.indexOf(
        wishFilter.toLowerCase()) !== -1
    })
    this.setState({
      filteredWishes
    })
  }

  render() {
    const { filteredWishes } = this.state
    const wishList = filteredWishes.map(wish => {
      return <Wish key={wish._id} wish={wish} history={this.props.history} />
    })

    return (
      <div id="WishList">
        <WishHeader />
        <WishFilter handleFilterSearch={this.filterWishes} handleCheckboxChange={this.filterWishesByType} />
        <ul>
          {wishList}
        </ul>
      </div>
    )
  }
}
