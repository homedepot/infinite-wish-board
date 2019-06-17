import React, { Component } from 'react'
import './styles.scss'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Header } from '../header/index'

class Login extends Component {
  constructor(props) {
    super(props)

    this.expressDomain =
      process.env.REACT_APP_expressDomain || 'http://localhost:3002'

    this.state = {
      username: '',
      password: ''
    }
  }

  createUser = async e => {
    e.preventDefault()

    const { username, password } = this.state

    try {
      await axios.post(`${this.expressDomain}/auth/register`, {
        username,
        password
      })

      this.setState({
        username: '',
        password: ''
      })
    } catch (e) {}
  }

  loginUser = async e => {
    e.preventDefault()

    const { username, password } = this.state

    try {
      await axios
        .create({ withCredentials: true })
        .post(`${this.expressDomain}/auth/login`, {
          username,
          password
        })
      this.props.history.push('/landing')
    } catch (e) {}
  }

  handleFormFieldChange = (key, { target: { value } }) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <div className='login-page' >
        <Header />
        <div className='login-container'>
          <div>
            <h2>New User?</h2>
            <form
              className="registration-form"
              onSubmit={this.createUser}
              data-register-form
            >
              First Name:
              <input
                type="text"
                data-register-first-name
                onChange={event =>
                  this.handleFormFieldChange('firstName', event)
                }
              />
              Last Name:
              <input
                type="text"
                data-register-last-name
                onChange={event =>
                  this.handleFormFieldChange('lastName', event)
                }
              />
              Username:
              <input
                type="text"
                data-register-username
                onChange={event =>
                  this.handleFormFieldChange('username', event)
                }
              />
              Password:
              <input
                type="password"
                data-register-password
                onChange={event =>
                  this.handleFormFieldChange('password', event)
                }
              />
              <input type="submit" value="Register" className="form-submit-btn" />
            </form>
          </div>

          <div>
            <h2>Have an account?</h2>
            <form
              className="login-form"
              onSubmit={this.loginUser}
              data-login-form
            >
              Username:{' '}
              <input
                type="text"
                data-login-username
                onChange={event =>
                  this.handleFormFieldChange('username', event)
                }
              />
              Password:{' '}
              <input
                type="password"
                data-login-password
                onChange={event =>
                  this.handleFormFieldChange('password', event)
                }
              />
              <input type="submit" value="Sign In" className="form-submit-btn" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export { Login }
export default withRouter(Login)
