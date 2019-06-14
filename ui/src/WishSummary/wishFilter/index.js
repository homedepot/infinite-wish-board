import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

export default class wishFilter extends Component {
    render() {
        return (
            <div className="wish-filter">
                <div className="wish-search-container">
                    <input className="wish-search" placeholder="Search by Name, Sponsor, Location and/or Date" />
                    <FontAwesomeIcon className="calendar-icon" icon={faCalendarAlt} />
                </div>
                <div className="">
                    <p>Filter by Wish Type</p>
                    <input type="checkbox" id="toGo" name="toGo" />
                    <label for="toGo">To Go</label>
                    <input type="checkbox" id="toMeet" name="toMeet" />
                    <label for="toGo">To Meet</label>
                    <input type="checkbox" id="toBe" name="toBe" />
                    <label for="toGo">To Be</label>
                    <input type="checkbox" id="toSee" name="toSee" />
                    <label for="toGo">To See</label>
                </div>
            </div>
        )
    }
}
