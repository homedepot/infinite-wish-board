import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { WatchAuth } from './WatchAuth'
import axios from 'axios'

describe('Watch Auth', () => {
  it('redirects on a 401', () => {
    const fakeHistory = []

    const wrapper = shallow(
      <WatchAuth children={jest.fn()} history={fakeHistory} />
    )

    const expectedRejectedResponse = {
      response: { status: 401 }
    }

    const rejectedResponse = axios.interceptors.response.handlers[0].rejected(
      expectedRejectedResponse
    )

    expect(rejectedResponse).toEqual(expectedRejectedResponse)

    expect(fakeHistory).toEqual(['/'])
  })

  it('does nothing on a 500', () => {
    const fakeHistory = []

    const wrapper = shallow(
      <WatchAuth children={jest.fn()} history={fakeHistory} />
    )

    const expectedRejectedResponse = {
      response: { status: 500 }
    }

    const rejectedResponse = axios.interceptors.response.handlers[0].rejected(
      expectedRejectedResponse
    )

    expect(rejectedResponse).toEqual(expectedRejectedResponse)
  })

  it('does nothing on success', () => {
    const expectedFulfilledResponse = { banana: 1 }

    const fakeHistory = []

    const wrapper = shallow(
      <WatchAuth children={jest.fn()} history={fakeHistory} />
    )

    const fulfilledResponse = axios.interceptors.response.handlers[0].fulfilled(
      expectedFulfilledResponse
    )

    expect(fulfilledResponse).toEqual(expectedFulfilledResponse)
  })
})
