import React from 'react'
import './styles.scss'
import ImgPlaceholder from '../imgPlaceholder'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import Rocket from '../../assets/images/icn_To_Go_Rocket_130x130.png'
import Alien from '../../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../../assets/images/icn_To_Be_Astronaut_130x130.png'
import Telescope from '../../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'

const Wish = ({wish, history}) => {
    const {child, sponsor, details} = wish

    const isToday = date => {
        let paramDate = new Date(date);
        let today = new Date();
        return paramDate.getDate() === today.getDate() && paramDate.getMonth() === today.getMonth() && paramDate.getFullYear() === today.getFullYear();
    }

    const handleWishClick = id => {
        const url = `/wish-summary/${id}`
        history.push(url)
    }

    const getImageSource = wish => {
        switch (wish.type.toLowerCase()) {
            case 'go':
                return Rocket
            case 'meet':
                return Alien
            case 'be':
                return Astronaut
            case 'have':
                return Telescope
            default:
                return ''
        }
    }

    const getWishType = wish => {
        switch (wish.type.toLowerCase()) {
            case 'go':
                return 'To Go'
            case 'meet':
                return 'To Meet'
            case 'be':
                return 'To Be'
            case 'have':
                return 'To Have'
            default:
                return ''
        }
    }

    return (
        <li className="wish" onClick={() => handleWishClick(wish._id)}>
            <div className="date-first-container">
                <div className="date-second-container">
                    <div className="week-day">
                        {new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(new Date(wish.createdAt))}
                    </div>
                    <div className="date-rose">
                            {new Date(wish.createdAt).getDate()}    
                        </div>
                </div>             
            </div>
            {child.image ? (
                <div className="child-image"><img src={child.image} alt="child"/></div>
            ) : (
            <ImgPlaceholder text="Add Image"/>
            )}
            <div className="wish-details">
                <div><strong>{child.name}</strong> - Age {child.age} from {child.hometown}</div>
                <div className="summary">{details}</div>
            </div>
            {sponsor.logo ? (
                <div className="sponsor">
                    <img src={sponsor.logo} alt="Sponsor" className="sponsor-logo-image"/>
                    <div className="sponsor-name">{sponsor.name}</div>
                </div>
            ) : (
            <div className="sponsor"><div className="add-sponsor" onClick={() => handleWishClick(wish._id)}>Add Sponsor</div></div>
            )}
            <div className="wish-type-container">
                <img src={getImageSource(wish)} alt={wish.type}/>
                <div className="wish-type">{getWishType(wish)}</div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="wish-chevron"/>
        </li>
)
}

export default Wish
