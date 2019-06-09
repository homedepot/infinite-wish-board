import React, { Component } from 'react'
import axios from 'axios'

export default class Landing extends Component {
  componentDidMount() {
    axios.get('http://localhost:3002/banana')
  }

  render() {
    return <div>LOGGED IN!!!</div>
  }
}
