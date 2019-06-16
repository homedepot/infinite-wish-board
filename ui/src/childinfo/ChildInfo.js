
import React, { Component } from 'react';
import rocketImage from '../../src/assets/icn_To_Go_Rocket_White_Inside_130x130.png';
import './ChildInfo.css';

export default class ChildInfo extends Component {
  constructor(props){
      super(props);
      this.props = props;
      this.state = {
        step: 0,
        homeTown: '',
        illness: '',
        details: '',
        showConfirmation: false,
        rocketRotation: 20,
        rocketWidth: 170,
        rocketContainerHeight: 350,
        isBlastOff: false
      }
      this.numSteps = Object.keys(this.stepMapFunction()).length
    }

    stepMapFunction = () => {
      let { name } = this.props
      return {
        0: {
          text: `Hi${name ? ` ${name}` : ''}, I have a few questions for you before we can make your wish come true!`,
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

    nextStep = () => {
      let stepMap = this.stepMapFunction();
      let { step } = this.state ;
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
        this.setState({
          showConfirmation: true
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

    getRocketStyle = () => {
      return {
        transform: `rotate(${this.state.rocketRotation}deg)`,
        width: `${this.state.rocketWidth}px`
      }
    }

    getRocketContainerStyle = () => {
      return {
        height: `${this.state.rocketContainerHeight}px`
      }
    }

    // Rocket blast off rotation animation
    blastOffTime = 20;
    rocketBlastOff = () => {
      this.setState({
        isBlastOff: true
      })

      setTimeout(() => {
        this.blastOffTime--;
        if(this.blastOffTime > -45) { 
          this.setState({
            rocketRotation: this.blastOffTime,
          })
          this.rocketBlastOff()
        } else {
          this.rocketSizeGrow()
        }
      }, 15)
    }

    // Rocket blast off grow animation
    rocketSize = 170;
    rocketSizeGrow = () => {
      setTimeout(() => {
        this.rocketSize++;
        if(this.rocketSize <= 250) {
          this.setState({
            rocketWidth: this.rocketSize,
          })
          this.rocketSizeGrow()
        } else {
          this.blastOff()
        }
      }, 10)
    }

    // Blast off rocket container
    rocketContainerHeight = 350
    blastOff = () => {
      setTimeout(() => {
        this.rocketContainerHeight--;
        if(this.rocketContainerHeight > 0) {
          this.setState({
            rocketContainerHeight: this.rocketContainerHeight
          })
          this.blastOff()
        }
      }, 10)
    }

    render() {
      let inputValue = this.state[this.getInputType()];
      let { showConfirmation, step } = this.state;
      return (
        !showConfirmation ?
          <div className='childInfo containerVertical'>
            <p className='progress'>{step + 1} of {this.numSteps}</p>
            <p className="text-name">{this.getTextField()}</p>
            { step ? //first step should not have any input
              <form>
                <input className='input-value' type="text" value={inputValue} onChange={this.updateInputField}/>
              </form>
            : ''
            }
              <button className='next-button' onClick={this.nextStep}>NEXT</button>
          </div> :
          <div>
            <div className='rocket-image-container' style={this.getRocketContainerStyle()}>
              <img className='rocket-image' style={this.getRocketStyle()} src={rocketImage} alt={rocketImage} />
            </div>
            {!this.state.isBlastOff && <button className='rocket-blast-off-button' onClick={this.rocketBlastOff}>Ready for blast off?</button>}
          </div>
      )
    }
}