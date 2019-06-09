import React, { Component } from 'react'
import { shallow } from 'enzyme'
import { WatchAuth } from './WatchAuth'
import axios from 'axios'

describe('Watch Auth', () => {
  it('renders child props', () => {
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

    const expectedFulfilledResponse = { banana: 1 }

    const fulfilledResponse = axios.interceptors.response.handlers[0].fulfilled(
      expectedFulfilledResponse
    )

    expect(fulfilledResponse).toEqual(expectedFulfilledResponse)
  })
})
