import React, { Component } from 'react'
import { Landing } from './splashScreen'

export default class CreateWish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      wishType: ''
    }
  }

  updateField = (field, value) => {
    this.setState({ [field]: value })
  }

  selectWishType = (wishType) => {
    console.log(wishType)
    this.setState({ wishType })
  }

  render() {
    const { name, age } = this.state
    return <Landing name={name}
                    age={age}
                    updateField={this.updateField}
                    selectWishType={this.selectWishType} />
  }
}
