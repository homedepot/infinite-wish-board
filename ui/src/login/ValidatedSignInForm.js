import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleNotch,
  faTimesCircle,
  faUser,
  faLock
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {
  USERNAME_EMPTY_ERROR,
  USERNAME_SHORT_ERROR,
  PASSWORD_EMPTY_ERROR,
  PASSWORD_SHORT_ERROR,
  PASSWORD_NUMBER_ERROR,
  SIGNING_IN,
  SIGN_IN
} from '../constants'

export default class ValidatedSignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invalidFormErrorMsg: '',
      isFormInvalid: false
    }
  }

  onSubmit = async (values, { setSubmitting, resetForm }) => {
    this.setState({ isFormInvalid: false })
    const { username, password } = values
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_expressDomain ||
        'http://localhost:3002'}/auth/login`,
        {
          username,
          password
        }
      )
      if (response.status === 200) {
        // store token or something like that to browser storage or wherever you want 
        localStorage.setItem('username', response.data.username)
        this.props.history.push('/')
      }
      else {
        this.setState({
          invalidFormErrorMsg: response.message,
          isFormInvalid: true
        })
        resetForm({
          username: '',
          password: ''
        })
        setSubmitting(false)
      }
    } catch (error) {
      this.setState({ isFormInvalid: true })
      resetForm({
        username: '',
        password: ''
      })
      setSubmitting(false)
    }
  }

  userSchema = Yup.object().shape({
    username: Yup.string()
      .required(USERNAME_EMPTY_ERROR)
      .min(3, USERNAME_SHORT_ERROR),
    password: Yup.string()
      .required(PASSWORD_EMPTY_ERROR)
      .min(8, PASSWORD_SHORT_ERROR)
      .matches(/(?=.*[0-9])/, PASSWORD_NUMBER_ERROR)
  })

  SignInForm = ({
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  }) => (
      <form className="login-form" onSubmit={handleSubmit} data-login-form>
        {this.state.isFormInvalid && (
          <div className="toast">
            <FontAwesomeIcon icon={faTimesCircle} className="icon" />
            {this.state.invalidFormErrorMsg}
          </div>
        )}
        <section className="input-section">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username && 'error'}
            placeholder="Username"
            data-signin-username
          />
        </section>
        {errors.username && touched.username && (
          <div className="input-feedback">{errors.username}</div>
        )}
        <section className="input-section">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && 'error'}
            placeholder="Password"
            data-signin-password
          />
        </section>
        {errors.password && touched.password && (
          <div className="input-feedback">{errors.password}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="form-submit-btn"
          data-signin-form
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faCircleNotch} className="fa-spin icon" />
              {SIGNING_IN}
            </>
          ) : (
              <span>{SIGN_IN}</span>
            )}
        </button>
      </form>
    )

  render() {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={this.onSubmit}
        validationSchema={this.userSchema}
        render={this.SignInForm}
      />
    )
  }
}
