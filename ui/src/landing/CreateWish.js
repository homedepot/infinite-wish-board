import React, { Component } from 'react'
import { Landing } from './splashScreen'
import Childinfo from '../childinfo/ChildInfo'

export default class CreateWish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      wishType: '',
      showChildInfo: false
    }
  }

  updateField = (field, value) => {
    this.setState({ [field]: value })
  }

  selectWishType = wishType => {
    const { name, age } = this.state

    if (name !== '' && age !== '') {
      this.setState({ wishType, showChildInfo: true })
    } else {
      this.setState({ wishType })
    }
  }

  render() {
    const { name, age, wishType, showChildInfo } = this.state

    return !showChildInfo ? (
      <Landing
        name={name}
        age={age}
        updateField={this.updateField}
        selectWishType={this.selectWishType}
      />
    ) : (
      <Childinfo
        name={name}
        age={age}
        type={wishType}
        history={this.props.history}
      />
    )
  }
}
