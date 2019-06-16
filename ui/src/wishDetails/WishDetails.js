import React, { Component } from 'react';
import PropsType from 'prop-types';
import WishDetailsService from '../services/WishDetailsService'
import Rocket from '../assets/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/icn_To_See_Telescope_White_Inside_130x130.png'

export default class WishDetails extends Component {
  constructor(props) {
    super();
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
    const wishDetails = await WishDetailsService.getWishDetails(this.props.childId)
    wishDetails && wishDetails !== '' && this.setState({
      wishDetails: wishDetails
    })
  }

  getImageByType = () => {
    let type = this.state.wishDetails.type.toUpperCase();
    let image = '';
    switch (type) {
      case 'GO':
        image = Rocket;
        break;
      case 'MEET':
        image = Alien;
        break;
      case 'BE':
        image = Astronaut;
        break;
      case 'SEE':
        image = Telescope;
        break;
      default:
        break;
    }
    return image;
  }

  render() {
    const { child, details, sponsor } = this.state.wishDetails;
    return (
      <div className='wishDetails containerVertical'>

        <div className='containerHorizontal'>
          <div className='containerVertical'>
            <div className='childDetails'>
              <p>Name</p>
              <p>Age</p>
              <p>Hometown</p>
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

WishDetails.propTypes = {
  childId: PropsType.string.isRequired
}
