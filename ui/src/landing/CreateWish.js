import React, { Component } from 'react'
import { Landing } from './splashScreen'
import Childinfo from '../childinfo/ChildInfo'

export default class CreateWish extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '2',
      wishType: '',
      isNameValid: true
    }
  }

  validFields = age => ({
    validAge: age !== '' && (Number(age) < 18 && Number(age) >= 2)
  })

  updateField = (field, value) => {
    const regex = /[a-zA-Z ]/g
    const matchRegex = value.match(regex)
    let validatedName = matchRegex !== null ? matchRegex.join('') : ''
    this.setState({ [field]: validatedName })
  }

  selectWishType = wishType => {
    const { name } = this.state
    if (name.length === 0) {
      this.setState({ wishType, isNameValid: false })
    } else {
      this.setState({ wishType })
    }
  }

  render() {
    const { name, age, wishType, isNameValid } = this.state
    const showChildInfo = wishType !== '' && name !== '' && age !== ''

    return !showChildInfo ? (
      <Landing
        name={name}
        age={age}
        updateField={this.updateField}
        selectWishType={this.selectWishType}
        validFields={this.validFields}
        isNameValid={isNameValid}
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
