
import React, { Component } from 'react';
import './ChildInfo.css';

export default class ChildInfo extends Component {
  constructor(props){
      super();
      // this.props;
      this.state = {
        step: 0,
        name: '',
        age: 0
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

        }
      }
    }

    nextStep = () => {
      let stepMap = this.stepMapFunction();
      console.log("next")
      console.log(Object.keys(stepMap).length);
      console.log(this.state.name);
      let { step } = { ...this.state };
      if (step < Object.keys(stepMap).length - 1) {
        window.scrollTo({
          top: 1000,
          behavior: 'smooth'
        });
        console.log("increment")
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
      return (
        <div className='childInfo containerVertical'>
            <p>{this.getTextField()}</p>
            <form>
              <input type="text" onChange={this.updateInputField}/>
            </form>
            <button onClick={this.nextStep}>NEXT</button>

        </div>
      )
    }
}