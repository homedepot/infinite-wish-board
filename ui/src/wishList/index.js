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
      const childName = `${wish && wish.child && wish.child.name ? wish.child.name.toLowerCase() : ''}`;
      const childHometown = `${wish && wish.child && wish.child.hometown ? wish.child.hometown.toLowerCase() : ''}`;
      const sponsorName = `${wish && wish.sponsor && wish.sponsor.name ? wish.sponsor.name.toLowerCase() : ''}`;

      const wishItem = `${childName} ${sponsorName} ${childHometown}`
      return wishItem.indexOf(
        wishFilter.toLowerCase()) !== -1
    })
    this.setState({
      filteredWishes
    })
  }
  handleExport = () => {
      const { filteredWishes} = this.state;
      //Generate the header first by flattening the filteredWishes object, and then append the values
      let csvContent = "data:text/csv;charset=utf-8,"  +
        Object.keys(filteredWishes[0]).map((item) => {
          if (['child', 'sponsor'].includes(item)) {
              return Object.keys(filteredWishes[0][item]).toString()
          }
          return item;
        })
      .join(',') + '\n' + filteredWishes.map(key => {
            return Object.values(key).map((item) => {
              if (typeof item === 'object') {
                  return Object.values(item).toString()
              }
              return item;
            });
          }).join('\n')
      const encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
  }

  render() {
    const { filteredWishes } = this.state
    const wishList = filteredWishes.map(wish => {
      return <Wish key={wish._id} wish={wish} history={this.props.history} />
    })

    return (
      <div id="WishList">
        <WishHeader />
        <WishFilter handleFilterSearch={this.filterWishes} handleCheckboxChange={this.filterWishesByType} handleExport={this.handleExport}/>
        <ul>
          {wishList}
        </ul>
      </div>
    )
  }
}
