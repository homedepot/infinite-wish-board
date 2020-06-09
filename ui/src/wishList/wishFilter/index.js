import React from 'react'
import calendarDate from '../../assets/images/calendar-date.png';
import './styles.scss'

const WishFilter = ({ yearSelected, handleFilterSearch, handleCheckboxChange, handleYearFilter }) => (
  <div className="wish-filter">
    <div className="search-type-filter">
      <div className="wish-search-container">
        <input
          className="wish-search"
          placeholder="Search by Name, Sponsor, Location and/or Date"
          onChange={handleFilterSearch}
        />
        <img src={calendarDate} alt="calendar-date"></img>
      </div>
      <div className="type-filter">
        <p>Filter by Wish Type</p>
        
        <label htmlFor="toGo" className="container">
          To Go
          <input
            type="checkbox"
            id="go"
            name="toGo"
            onClick={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>

        <label htmlFor="toMeet" className="container">
          To Meet
          <input
            type="checkbox"
            id="meet"
            name="toMeet"
            onClick={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        
        <label htmlFor="toBe" className="container">
          To Be
          <input
            type="checkbox"
            id="be"
            name="toBe"
            onClick={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>

        <label htmlFor="toHave" className="container">
          To Have
          <input
            type="checkbox"
            id="have"
            name="toHave"
            onClick={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
    <div className="year-filter">
      <span year="ViewAll" onClick={handleYearFilter} className={yearSelected === 'ViewAll' ? 'selected' : ''}>View All</span>
      <span year="2020" onClick={handleYearFilter} className={yearSelected === '2020' ? 'selected' : ''}>2020</span>
      <span year="2019" onClick={handleYearFilter} className={yearSelected === '2019' ? 'selected' : ''}>2019</span>
      <span year="2018" onClick={handleYearFilter} className={yearSelected === '2018' ? 'selected' : ''}>2018</span>
    </div>
  </div>
)

export default WishFilter
