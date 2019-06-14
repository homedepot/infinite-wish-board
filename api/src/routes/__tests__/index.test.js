const request = require('supertest')
const index = require('./index')

describe('see if we can test the index', () => {
  it('should say hello', async () => {
    const response = await request(index)
      .get('/')

    expect(response.statusCode).toEqual(200)
  })
})