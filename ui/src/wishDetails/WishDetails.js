import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WishDetailsService from '../services/WishDetailsService'
import Rocket from '../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'
import './styles.scss';
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
        <div className='wishDetails containerVertical'>
          <div className='back-to-summary-link-container'>
            <Link to="/wish-summary">Back to Summary</Link>
          </div>
          <div className='containerHorizontal evenSpacing'>
            <div className='containerVertical'>
              <div className='childDetails containerVertical'>
                <div><label>Name: </label><span>{name}</span></div>
                <div><label>Age: </label><span>{age}</span></div>
                <div><label>Hometown: </label><span>{hometown}</span></div>
              </div>
              <div className='illness-summary containerVertical'>
                <h3>Illness Summary</h3>
                <p>
                  {child.illness}
                </p>
              </div>
            </div>

            <div className='sponsor-info containerVertical'>
              <h2>Sponsor</h2>
              <p>{sponsor.name}</p>
            </div>
          </div>

          <div className='wish-details-container containerHorizontal'>
            <div className='wish-type containerVertical'>
              <img src={this.getImageByType()} alt={Rocket} />
            </div>
            <div className='wish-details containerVertical'>
              <h3>Wish Details</h3>
              <p>{details}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
