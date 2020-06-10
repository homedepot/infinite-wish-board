import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleNotch,
  faTimesCircle,
  faSmile,
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
  FULLNAME_EMPTY_ERROR,
  FULLNAME_SHORT_ERROR,
  CREATING_ACCOUNT,
  CREATE_MY_ACCOUNT
} from '../constants'

export default class ValidatedSignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invalidFormErrorMsg: '',
      isFormInvalid: false
    }
  }

  onSubmit = async (values, { setSubmitting, resetForm }) => {
    this.setState({ isFormInvalid: false })
    const { fullName, username, password } = values
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_expressDomain ||
          'http://localhost:3002'}/auth/register`,
        {
          fullName,
          username,
          password
        }
      )
      if (response.data === 'OK') this.props.history.push('/landing')
      else {
        this.setState({
          invalidFormErrorMsg: response.response.data,
          isFormInvalid: true
        })
        resetForm({
          fullName: '',
          username: '',
          password: ''
        })
        setSubmitting(false)
      }
    } catch (error) {
      this.setState({ isFormInvalid: true })
      resetForm({
        fullName: '',
        username: '',
        password: ''
      })
      setSubmitting(false)
    }
  }

  newUserSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(FULLNAME_EMPTY_ERROR)
      .min(5, FULLNAME_SHORT_ERROR),
    username: Yup.string()
      .required(USERNAME_EMPTY_ERROR)
      .min(3, USERNAME_SHORT_ERROR),
    password: Yup.string()
      .required(PASSWORD_EMPTY_ERROR)
      .min(8, PASSWORD_SHORT_ERROR)
      .matches(/(?=.*[0-9])/, PASSWORD_NUMBER_ERROR)
  })

  SignUpForm = ({
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  }) => (
    <form className="signup-form" onSubmit={handleSubmit} data-login-form>
      {this.state.isFormInvalid && (
        <div className="toast">
          <FontAwesomeIcon icon={faTimesCircle} className="icon" />
          {this.state.invalidFormErrorMsg}
        </div>
      )}
      <section className="input-section">
        <FontAwesomeIcon icon={faSmile} className="icon" />
        <input
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.fullName && touched.fullName && 'error'}
          data-register-fullname
          placeholder="Full Name"
        />
      </section>
      {errors.fullName && touched.fullName && (
        <div className="input-feedback">{errors.fullName}</div>
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
          data-register-username
          placeholder="Username"
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
          data-register-password
          placeholder="Password"
        />
      </section>
      {errors.password && touched.password && (
        <div className="input-feedback">{errors.password}</div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="form-submit-btn"
        data-register-form
      >
        {isSubmitting ? (
          <>
            <FontAwesomeIcon icon={faCircleNotch} className="fa-spin icon" />
            {CREATING_ACCOUNT}
          </>
        ) : (
          <span>{CREATE_MY_ACCOUNT}</span>
        )}
      </button>
    </form>
  )

  render() {
    return (
      <Formik
        initialValues={{
          fullName: '',
          username: '',
          password: ''
        }}
        onSubmit={this.onSubmit}
        validationSchema={this.newUserSchema}
        render={this.SignUpForm}
      />
    )
  }
}
