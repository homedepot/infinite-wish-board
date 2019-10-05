
import React, { Component, Fragment } from 'react';
import WishDetailsService from '../services/WishDetailsService';
import rocketImage from '../../src/assets/images/rocket.png';
import rocketSound from '../../src/assets/audio/rocketSound.wav';
import './styles.scss';

export default class ChildInfo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      step: 0,
      homeTown: '',
      illness: '',
      details: '',
      showConfirmation: false,
      showWishDetails: false,
      launchRocket: false
    }
    this.numSteps = Object.keys(this.stepMapFunction()).length

    this.soundEffect = new Audio();
    this.soundEffect.src = rocketSound;
  }

  stepMapFunction = () => {
    let { name } = this.props
    return {
      0: {
        text: `Hi,${name ? ` ${name}` : ''}. I have a few questions for you before we can make your wish come true!`,
        input: ''
      },
      1: {
        text: 'Where are you from?',
        input: 'homeTown'
      },
      2: {
        text: 'Tell us about your condition',
        input: 'illness'
      },
      3: {
        text: 'Tell us more about your wish!',
        input: 'details'
      }
    }
  }

  nextStep = async () => {
    let stepMap = this.stepMapFunction();
    let { step } = this.state;
    if (step < Object.keys(stepMap).length - 1) {
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
      this.setState({
        step: step + 1
      }, () => {
        this.scrollToTop();
      });
    } else {

      const { homeTown, illness, details } = this.state
      const { name, age, type } = this.props

      const wish = {
        child: {
          name: name,
          age: age,
          hometown: homeTown,
          illness: illness
        },
        type: type ? type.toLowerCase() : '',
        details: details
      }

      const response = await WishDetailsService.makeAWish(wish)

      this.setState({
        showConfirmation: true,
        childId: response._id
      })
    }
  }

  scrollToTop = () => {
    setTimeout(() =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }),
      300
    )
  }

  getTextField = () => {
    return this.stepMapFunction()[this.state.step].text;
  }

  getInputType = () => {
    return this.stepMapFunction()[this.state.step].input;
  }

  updateInputField = evt => {
    let inputType = this.getInputType();
    if (inputType !== '') {
      this.setState({
        [inputType]: evt.target.value
      });
    }
  }

  rocketBlastOff = () => {
    this.setState({
      launchRocket: true
    })
    this.soundEffect.play();
    setTimeout(() => {
      this.soundEffect.pause();
      const url = `/wish-summary/${this.state.childId}`
      this.props.history.push(url)
    }, 3000);
  }

  render() {
    let inputValue = this.state[this.getInputType()];
    let { showConfirmation, step } = this.state;
    return (
        <>
          {!showConfirmation ?
            <div className="first">
              <div className='childInfo containerVertical spotlight inner'>
                <p className='progress'>{step + 1} of {this.numSteps}</p>
                <p className="text-name">{this.getTextField()}</p>
                {step ? //first step should not have any input
                  <form>
                    <input className='input-value' type="text" value={inputValue} onChange={this.updateInputField} />
                  </form>
                  : ''
                }
                <button className='next-button' onClick={this.nextStep}>Next</button>
              </div>
            </div>
            :
            <div>
              <div className="rocketPage">
                <img className={this.state.launchRocket ? 'rocket-launch' : 'rocket'} src={rocketImage} alt={rocketImage} />
                <button className='rocket-blast-off-button' onClick={this.rocketBlastOff} disabled={this.state.launchRocket}>Fulfill my wish</button>
              </div>
            </div>
          }
        </>
    )
  }
}
