import React, { Component } from 'react'
import WishDetailsService from '../services/WishDetailsService'
import Rocket from '../assets/images/icn_To_Go_Rocket_White_Inside_130x130.png'
import Alien from '../assets/images/icn_To_Meet_Alien_White_Inside_130x130.png'
import Astronaut from '../assets/images/icn_To_Be_Astronaut_White_Inside_130x130.png'
import Telescope from '../assets/images/icn_To_See_Telescope_White_Inside_130x130.png'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import WishHeader from '../wishList/wishHeader'

const styles = {
  link:{
    color: '#000000',
    textDecoration: 'underline'
  }
}

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

  updateHometownField(hometown) {
    this.setState(prevState => ({
      ...prevState,
      wishDetails: {
        ...prevState.wishDetails,
        child: {
          ...prevState.wishDetails.child,
          hometown: hometown
        }
      }
    }));
  }
  // () => this.updateHometown({child: wishDetails.child, type: wishDetails.type, details: wishDetails.details}
  updateHometown = async (wish) => {
    const { id } = this.props.match.params
    return await WishDetailsService.editAWish(id, wish);
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const wishDetails = await WishDetailsService.getWishDetails(id)
    wishDetails &&
      wishDetails !== '' &&
      this.setState({
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
      case 'HAVE':
        image = Telescope
        break
      default:
        break
    }
    return image
  }

  goToWishSummary(wish) {
    this.updateHometown(wish).then(() => this.props.history.push('/wish-summary'))
  }

  render() {
    const { child, details, sponsor, type } = this.state.wishDetails
    const { name, age, hometown } = child

    const wish = {
      child: child,
      type: type,
      details: details
    }

    return (
      <div className="wish-details-page">
        <WishHeader />
        <div className="back-to-summary-link-container">
          <span style={styles.link} data-test="go-to-summary-link" onClick={() => this.goToWishSummary(wish)} to="">Back to Summary</span>
        </div>
        <div className="wishDetails containerHorizontal evenSpacing">
          <div>
            <div className="imageFrame">
              <FontAwesomeIcon icon={faCamera} className="camera-icon" />
            </div>
            <p>Upload Image</p>
          </div>
          <div className="childDetails containerVertical">
            <div>
              <span>{name}</span>
            </div>
            <div>
              <label>Age: </label>
              <span>{age}</span>
            </div>
            <div>
              <label>Hometown: </label>
              <input data-test="hometown-input" placeholder="enter your hometown" type="text" onBlur={() => this.updateHometown(wish)} onChange={(e) => this.updateHometownField(e.target.value)} value={hometown}/>
            </div>
            <h3>Illness Summary</h3>
            <textarea readOnly value={child.illness}></textarea>
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
        <div className="wish-details-container containerHorizontal">
          <div className="wish-type containerVertical">
            <img
              src={this.getImageByType()}
              alt={Rocket}
              className="wish-type-img"
            />
          </div>
          <div className="wish-details containerVertical">
            <h3>Wish Details</h3>
            <textarea readOnly value={details}></textarea>
          </div>
        </div>
      </div>
    )
  }
}
