import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Header } from '../header/index'
import {
  NEW_USER,
  EXISTING_USER,
  SIGN_IN,
  CREATE_ACCOUNT,
  CREATE_MY_ACCOUNT
} from '../constants'
import ValidatedSignInForm from './ValidatedSignInForm'
import ValidatedSignUpForm from './ValidatedSignUpForm'
import './styles.scss'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSignIn: true
    }
  }

  toggleForm = () => {
    this.setState({ showSignIn: !this.state.showSignIn })
  }

  render() {
    const { showSignIn } = this.state
    const { history } = this.props

    return (
      <div className="login-page">
        <Header logout={false} />
        <main className="main-section">
          {showSignIn ? (
            <section className="form-wrapper">
              <h2 className="signin-title">{SIGN_IN}</h2>
              <ValidatedSignInForm history={history} />
              <section className="signup-section">
                <span className="divider-text">{NEW_USER}</span>
                <button
                  onClick={this.toggleForm}
                  className="form-submit-btn btn-link"
                >
                  {CREATE_MY_ACCOUNT}
                </button>
              </section>
            </section>
          ) : (
            <section className="form-wrapper">
              <h2 className="signup-title">{CREATE_ACCOUNT}</h2>
              <ValidatedSignUpForm history={history} />
              <section className="signup-section">
                <span className="divider-text">{EXISTING_USER}</span>
                <button className="btn-link" onClick={this.toggleForm}>
                  {SIGN_IN}
                </button>
              </section>
            </section>
          )}
        </main>
      </div>
    )
  }
}

export { Login }
export default withRouter(Login)
