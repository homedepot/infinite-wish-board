
import React, { Component } from 'react';
import rocketImage from '../../src/assets/icn_To_Go_Rocket_White_Inside_130x130.png';
import './ChildInfo.css';

export default class ChildInfo extends Component {
  constructor(props){
      super();
      // this.props;
      this.state = {
        step: 0,
        name: '',
        age: '',
        homeTown: '',
        illness: '',
        details: '',
        showConfirmation: false,
        rocketRotation: 30
      }
    }

    stepMapFunction = () => {
      return {
        0: {
          text: 'Hi what is your name?',
          input: 'name'
        },
        1: {
          text: `Hi ${this.state.name}, how old are you?`,
          input: 'age'
        },
        2: {
          text: 'Where are you from?',
          input: 'homeTown'
        },
        3: {
          text: 'Tell us about your condition',
          input: 'illness'
        },
        4: {
          text: 'Tell us more about your wish!',
          input: 'details'
        }
      }
    }

    nextStep = () => {
      let stepMap = this.stepMapFunction();
      let { step } = { ...this.state };
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
      ;
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
      this.setState({
        [this.getInputType()]: evt.target.value
      });
    }


    getRocketStyle = () => {
      return {
        transform: `rotate(${this.state.rocketRotation}deg)`,
        width: '200px'
      }
    }

    rocketBlastOff = () => {

      for(let i = this.state.rocketRotation; i > -45; i--) {
        setTimeout(
          this.setState({
            rocketRotation: this.state.rocketRotation--
          })
        , 30)
      }
    }

    render() {
      let inputValue = this.state[this.getInputType()];
      let { showConfirmation } = this.state;

      return (
        showConfirmation ?
          <div className='childInfo containerVertical'>
              <p className="text-name">{this.getTextField()}</p>
              <form>
                <input className='input-value' type="text" value={inputValue} onChange={this.updateInputField}/>
              </form>
              <button className='next-button' onClick={this.nextStep}>NEXT</button>
          </div> :
          <div>
            <img className='rocket-image' style={this.getRocketStyle()} src={rocketImage} alt={rocketImage} />
            <button className='rocket-blast-off-button' onClick={this.rocketBlastOff}/>
          </div>
      )
    }
}