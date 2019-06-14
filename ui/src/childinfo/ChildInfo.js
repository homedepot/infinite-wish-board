
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

      this.stepMap = {
        0: {
          text: 'Hi what is your name?',
          input: 'name'
        },
        1: {
          text: `Hi ${this.state.name}, how old are you?`,
          input: 'age'
        }
      }
    }

    nextStep = () => {

      console.log("next")
      let { step } = { ...this.state };
      if (step < this.stepMap.length - 1) {
        this.setState({
          step: step + 1
        })
      }
    }

    getTextField = () => {
      return this.stepMap[0].text;
    }

    getInputType = () => {
      return this.stepMap[0].input;
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
              <button onClick={this.nextStep}>NEXT</button>
            </form>
            <div>TEST</div>
        </div>
      )
    }
}