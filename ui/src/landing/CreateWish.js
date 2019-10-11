import React, { Component } from 'react'
import { Landing } from './splashScreen'
import Childinfo from '../childinfo/ChildInfo'

export default class CreateWish extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '2',
      wishType: ''
    }
  }

  validFields = (age, name) => ({
      validAge: age !== '' && (Number(age) < 18 && Number(age) >= 2),
      validName: (name !== '') && (name.match(/[\w\-’\s]+/)) ? true : false
  })

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
