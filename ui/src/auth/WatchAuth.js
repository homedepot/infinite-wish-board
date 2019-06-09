import { Component } from 'react'
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

export { WatchAuth }
export default withRouter(WatchAuth)
