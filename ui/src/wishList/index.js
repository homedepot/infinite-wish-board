import React, { Component } from 'react'
import Wish from './wish'
import WishHeader from './wishHeader'
import WishFilter from './wishFilter'
import './styles.scss'
import { getWishes } from '../services/WishDetailsService'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

export default class WishList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wishes: [],
      typeFilters: [],
      filteredWishes: [],
      yearFilter: 'ViewAll'
    }
  }

  async componentDidMount() {
    const wishes = await getWishes()
    this.setState({ wishes, filteredWishes: wishes })
  }

  filterWishesByType = async (e) => {
    let { typeFilters } = this.state
    let yearFilter = this.state.yearFilter

    if(e.target.checked) {
      typeFilters.push(e.target.id)
    }
    else {
      typeFilters = typeFilters.filter(type => type !== e.target.id)
    }

    let beginDate = ''
    let endDate = ''
    if(yearFilter !== "ViewAll") {
      beginDate = `${yearFilter}-01-01T00:00:00Z`
      endDate = `${yearFilter}-12-31T23:59:59Z`
    }
    let sort = 'desc'

    let filteredWishes = await getWishes(typeFilters, beginDate, endDate, sort);
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

  filterWishesByYear = async (e) => {
    let { yearFilter } = this.state
    let types = this.state.typeFilters
    yearFilter = e.target.attributes.year.value

    let beginDate = ''
    let endDate = ''
    if(yearFilter !== "ViewAll") {
      beginDate = `${yearFilter}-01-01T00:00:00Z`
      endDate = `${yearFilter}-12-31T23:59:59Z`
    }
    let sort = 'desc'
    let filteredWishes = await getWishes(types, beginDate, endDate, sort);

    this.setState({
      filteredWishes,
      yearFilter
    })
  }

  toggleMonthWishes = (e) => {
    console.log(e.currentTarget)
    e.currentTarget.parentNode.classList.toggle("hide")
  }

  render() {
    const { filteredWishes } = this.state
    let newList
    const wishList = filteredWishes.map((monthWishes, i) => {
      if(monthWishes.wishes){
        newList = monthWishes.wishes.map(wish => {
          return <Wish key={wish._id} wish={wish} history={this.props.history} />
        })
        let date = new Date(monthWishes.wishes[0].createdAt)
        let firstDay = new Date(monthWishes.year, date.getMonth(), 1).getDate();
        let lastDay = new Date(monthWishes.year, date.getMonth() + 1, 0).getDate();
  
        let header = (
          <div key={i} className="month-header" onClick={this.toggleMonthWishes}>
            <div className="month-name">{monthWishes.month}</div>
            <div className="month-dates">{monthWishes.month} {firstDay} - {monthWishes.month} {lastDay}, {monthWishes.year}</div>
            <FontAwesomeIcon icon={faChevronDown} className="month-chevron"/>
          </div>
        )
        newList.unshift(header) 
        return (
          <div key={i.toString() + "monthWishes"} className="monthWishes">
            {newList}
          </div>
        )
      }
      
    })

    return (
      <div id="WishList">
        <WishHeader />
        <WishFilter yearSelected={this.state.yearFilter} handleFilterSearch={this.filterWishes} handleCheckboxChange={this.filterWishesByType} handleYearFilter={this.filterWishesByYear} />
        <ul>
          {wishList}
        </ul>
      </div>
    )
  }
}
