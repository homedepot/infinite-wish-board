import React from 'react'
import './styles.scss'
import ImgPlaceholder from '../imgPlaceholder'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight, faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
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

    let dateClasses = isToday(wish.createdAt) ? 'date-now' : 'date';
    let childImageSpace = child.image ? <img src={child.image} alt="child"/> : <ImgPlaceholder text="Add Image"/>
    let sponsorLogoSpace = sponsor.logo ? <img src={sponsor.logo} alt="Sponsor" className="sponsor"/> : <p>Add Sponsor</p>


    return (
      <li className="wish" onClick={() => handleWishClick(wish._id)}>
          <div>
              <div hidden={!wish.isIncomplete}>
                  <FontAwesomeIcon icon={faExclamationCircle} color="red" transform="right-25 down-10" size="2x"/>
              </div>
              <div className={dateClasses}>{new Date(wish.createdAt).getDate()}</div>
          </div>
          {childImageSpace}
          <div>
              <p>
                  <strong>{child.name}</strong> - Age {child.age} from {child.hometown}
              </p>
              <span className="summary">{details}</span>
          </div>
          {sponsorLogoSpace}
          <div className="wish-type-container">
              <img src={getImageSource(wish)} alt={wish.type}/>
              <span>{getWishType(wish)}</span>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="wish-chevron"/>
      </li>
)
}

export default Wish
