import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class WatchAuth extends Component {
  constructor(props) {
    super(props)
    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error.response.status === 401) {
          props.history.push('/')
        }
        return error
      }
    )
  }

  render() {
    return this.props.children
  }
}

export default withRouter(WatchAuth)
