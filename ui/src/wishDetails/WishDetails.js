import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WishDetailsService from '../services/WishDetailsService'
import Rocket from '../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'

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
      <div className='wishDetails containerVertical'>
        <Link to="/wish-summary">Back to Summary</Link>
        <div className='containerHorizontal'>
          <div className='containerVertical'>
            <div className='childDetails'>
              <label>Name: </label><span>{name}</span>
              <label>Age: </label><span>{age}</span>
              <label>Hometown: </label><span>{hometown}</span>
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

        <div className='containerHorizontal'>
          <div className='wish-type containerVertical'>
            <img src={this.getImageByType()} alt={Rocket} />
          </div>
          <div className='wish-details containerVertical'>
            <h3>Wish Details</h3>
            <p>{details}</p>
          </div>
        </div>
      </div>
    )
  }
}
