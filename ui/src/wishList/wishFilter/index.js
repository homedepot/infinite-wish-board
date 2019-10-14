import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const WishFilter = ({ handleFilterSearch, handleCheckboxChange }) => (
  <div className="wish-filter">
    <div className="wish-search-container">
      <input
        className="wish-search"
        placeholder="Search by Name, Sponsor, Location and/or Date"
        onChange={handleFilterSearch}
      />
      <FontAwesomeIcon className="calendar-icon" icon={faCalendarAlt} />
    </div>
    <div className="type-filter">
      <p>Filter by Wish Type</p>
      <input
        type="checkbox"
        id="go"
        name="toGo"
        onClick={handleCheckboxChange}
      />
      <label htmlFor="toGo">To Go</label>
      <input
        type="checkbox"
        id="meet"
        name="toMeet"
        onClick={handleCheckboxChange}
      />
      <label htmlFor="toMeet">To Meet</label>
      <input
        type="checkbox"
        id="be"
        name="toBe"
        onClick={handleCheckboxChange}
      />
      <label htmlFor="toBe">To Be</label>
      <input
        type="checkbox"
        id="have"
        name="toHave"
        onClick={handleCheckboxChange}
      />
      <label htmlFor="toHave">To Have</label>
    </div>
  </div>
)

export default WishFilter
