import React, { Component } from 'react'
import { Landing } from './splashScreen'
import Childinfo from '../childinfo/ChildInfo'

export default class CreateWish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '1',
      wishType: ''
    }
  }

  validFields = () => {
    if (Number(this.state.age) < 18) {
      if (this.state.name !== '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  updateField = (field, value) => {
    this.setState({ [field]: value })
  }

  selectWishType = (wishType) => {
    this.setState({ wishType })
  }

  render() {
    const { name, age, wishType } = this.state;
    const showChildInfo = wishType !== '' && name !== '' && age !== '';

    return (
      !showChildInfo ?
        <Landing name={name}
          age={age}
          updateField={this.updateField}
          selectWishType={this.selectWishType}
          validFields={this.validFields} /> :
        <Childinfo name={name} age={age} type={wishType} history={this.props.history} />
    )
  }
}
