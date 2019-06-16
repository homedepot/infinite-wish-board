import React from 'react'
import './styles.scss'
import kidImg from '../../assets/images/icn_To_Be_Astronaut_130x130.png'
import sponsorImg from '../../assets/images/icn_To_Be_Astronaut_130x130.png'
import ImgPlaceholder from '../imgPlaceholder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Wish = ({ wish }) => {
  const { child, details } = wish

  return (
    <li className="wish">
      <div className="date">
      </div>
      {false ? <img src={kidImg} alt="child" /> : <ImgPlaceholder text="Add Image" />}
      <div>
        <p>
          <strong>Maria</strong> - Age {child.age} from {child.hometown}
        </p>
        <span className="summary">
                        {details}
                    </span>
      </div>
      {false ? <img src={sponsorImg} alt="Sponsor" className="sponsor" /> : <a href="/review">Add Sponsor</a>}
      <FontAwesomeIcon icon={faChevronRight} className="wish-chevron" />
    </li>
  )
}

export default Wish
