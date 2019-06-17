import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WishDetailsService from '../services/WishDetailsService'
import Rocket from '../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import WishHeader from '../wishList/wishHeader'

export default class WishDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      wishDetails: {
        id: '',
        child: {
          name: '',
          hometown: '',
          illness: '',
          age: ''
        },
        type: '',
        details: '',
        sponsor: {
          name: '',
          logo: '',
          links: []
        },
        createdAt: '',
        updatedAt: ''
      }
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const wishDetails = await WishDetailsService.getWishDetails(id)
    wishDetails && wishDetails !== '' && this.setState({
      wishDetails
    })
  }

  getImageByType = () => {
    let type = this.state.wishDetails.type.toUpperCase()
    let image = ''
    switch (type) {
      case 'GO':
        image = Rocket
        break
      case 'MEET':
        image = Alien
        break
      case 'BE':
        image = Astronaut
        break
      case 'SEE':
        image = Telescope
        break
      default:
        break
    }
    return image
  }

  render() {
    const { child, details, sponsor } = this.state.wishDetails
    const { name, age, hometown } = child;

    return (
      <div className='wish-details-page'>
        <WishHeader />
        <div className='back-to-summary-link-container'>
            <Link to="/wish-summary">Back to Summary</Link>
          </div>
        <div className='wishDetails containerHorizontal evenSpacing'>
          <div>
            <div className="imageFrame">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
            <p>Upload Image</p>
          </div>
          <div className='childDetails containerVertical'>
            <div><span>{name}</span></div>
            <div><label>Age: </label><span>{age}</span></div>
            <div><label>Hometown: </label><span>{hometown}</span></div>
            <h3>Illness Summary</h3>
            <textarea value={child.illness}>
            </textarea>
            <h4>Parent's Name:</h4>
            <input />
            <h4>Contact Info:</h4>
            <input />
          </div>
          <div>
              <h3>Sponsor Details</h3>
              <div className="imageFrame">
                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
              </div>
              <p>Upload Sponsor's Logo</p>
              <p>{sponsor.name}</p>
          </div>
        </div>
        <div className='wish-details-container containerHorizontal'>
            <div className='wish-type containerVertical'>
              <img src={this.getImageByType()} alt={Rocket} className="wish-type-img" />
            </div>
            <div className='wish-details containerVertical'>
              <h3>Wish Details</h3>
              <textarea value={details}></textarea>
            </div>
          </div>
      </div>
    )
  }
}
