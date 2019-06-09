import React, { Component, Fragment } from 'react'
import './Login.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  createUser = async e => {
    e.preventDefault()

    const { username, password } = this.state

    try {
      await axios.post('http://localhost:3002/auth/register', {
        username,
        password
      })

      this.setState({
        username: '',
        password: ''
      })
    } catch (e) {
      console.log(`response is: ${e}`)
    }
  }

  loginUser = async e => {
    e.preventDefault()

    const { username, password } = this.state

    try {
      await axios
        .create({ withCredentials: true })
        .post('http://localhost:3002/auth/login', {
          username,
          password
        })

      this.props.history.push('/landing')
    } catch (e) {
      console.log(`response is: ${e}`)
    }
  }

  handleFormFieldChange = (key, { target: { value } }) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.createUser} data-register-form>
          <h2>Register a user</h2>
          Username:{' '}
          <input
            type="text"
            data-register-username
            onChange={event => this.handleFormFieldChange('username', event)}
          />
          Password:{' '}
          <input
            type="password"
            data-register-password
            onChange={event => this.handleFormFieldChange('password', event)}
          />
          <input type="submit" value="Submit!" />
        </form>

        <form onSubmit={this.loginUser} data-login-form>
          <h2>Login</h2>
          Username:{' '}
          <input
            type="text"
            data-login-username
            onChange={event => this.handleFormFieldChange('username', event)}
          />
          Password:{' '}
          <input
            type="password"
            data-login-password
            onChange={event => this.handleFormFieldChange('password', event)}
          />
          <input type="submit" value="Submit!" />
        </form>
      </Fragment>
    )
  }
}

export { Login }
export default withRouter(Login)
