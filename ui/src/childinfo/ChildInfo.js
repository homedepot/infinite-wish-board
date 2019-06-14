
import React, { Component } from 'react';
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
        details: ''
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

    render() {
      let inputValue = this.state[this.getInputType()]
      return (
        <div className='childInfo containerVertical'>
            <p className="text-name">{this.getTextField()}</p>
            <form>
              <input className='input-value' type="text" value={inputValue} onChange={this.updateInputField}/>
            </form>
            <button className='next-button' onClick={this.nextStep}>NEXT</button>

        </div>
      )
    }
}