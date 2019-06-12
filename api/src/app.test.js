const request = require('supertest')

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('./app')

describe('Sanity test express', () => {
  it('should boot up!', async () => {
    const response = await request(app).get('/')

    expect(response.statusCode).toEqual(200)
  })
})
