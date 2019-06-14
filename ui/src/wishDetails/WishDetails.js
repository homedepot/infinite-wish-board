import React, { Component } from 'react';
import WishDetailsService from '../services/WishDetailsService'
import rocketImage from '../../src/assets/icn_To_Go_Rocket_White_Inside_130x130.png';

export default class WishDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      wishDetails: {
        id: '',
        child: {
          firstName: "",
          lastName: " ",
          hometown: "",
          illness: "",
          age: ""
        },
        type: "",
        details: "",
        sponsor: {
          name: "",
          logo: "",
          links: []
        },
        createdAt: "",
        updatedAt: ""
      }
    }
  }

  async componentDidMount() {
    const wishDetails = await WishDetailsService.getWishDetails(this.state.id)
    this.setState({
      wishDetails: wishDetails
    })
  }

  render() {
    const { child, details, sponsor } = this.state.wishDetails

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
            <img src={rocketImage} alt={rocketImage} />
          </div>
          <div className='wish-details containerVertical'>
            <h3>Wish Detials</h3>
            <p>{details}</p>
          </div>
        </div>
      </div>
    )
  }
}
