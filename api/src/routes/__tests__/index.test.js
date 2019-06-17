const request = require('supertest')
const mongoose = require('mongoose')

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('../../app')

describe('see if we can test the index', () => {
  it('should say hello', async () => {
    const response = await request(app).get('/').catch(error => {
      throw new Error(error)
    })

    expect(response.statusCode).toEqual(200)
    expect(response.text).toEqual('hello')
  })
})
