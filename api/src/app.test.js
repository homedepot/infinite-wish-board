const request = require('supertest')

describe('Sanity test express', () => {
  let server
  beforeEach(() => {
    process.env.mongoUrl = 'mongodb://localhost:27017/test'
    server = require('./app')
  })

  afterEach(() => {
    server.close()
  })

  it('should boot up!', async () => {
    const response = await request(server).get('/')

    expect(response.statusCode).toEqual(200)
  })
})
