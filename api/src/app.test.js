const request = require('supertest')
const mongoose = require('mongoose')

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('./app')
const Account = require('./db/Account')
const Wish = require('./db/Wish')

beforeEach(async () => {
  await Account.deleteMany({})
  await Wish.deleteMany({})
})

describe('Sanity test express', () => {
  it('should boot up!', async () => {
    const response = await request(app).get('/')

    expect(response.statusCode).toEqual(200)
  })
})

describe('edgecases', () => {
  it("returns 404 on a route that doesn't exist", async () => {
    const response = await request(app).get('/banana')

    expect(response.statusCode).toEqual(404)
  })
})

describe('auth', () => {
  describe('happy path', () => {
    it('allows you to register and login with a user', async () => {
      const registerResponse = await request(app)
        .post('/auth/register')
        .type('form')
        .send({ username: 'secrete-username', password: 'secret-password' })

      expect(registerResponse.statusCode).toEqual(200)

      const loginResponse = await request(app)
        .post('/auth/login')
        .type('form')
        .send({ username: 'secrete-username', password: 'secret-password' })

      expect(loginResponse.statusCode).toEqual(200)

      const logoutResponse = await request(app).get('/auth/logout')

      expect(logoutResponse.statusCode).toEqual(200)
    })
  })

  describe('edge cases', () => {
    it("doesn't allow you to register the same user twice", async () => {
      const registerResponse = await request(app)
        .post('/auth/register')
        .type('form')
        .send({ username: 'secrete-username', password: 'secret-password' })

      expect(registerResponse.statusCode).toEqual(200)

      const badRegisterResponse = await request(app)
        .post('/auth/register')
        .type('form')
        .send({ username: 'secrete-username', password: 'secret-password' })

      expect(badRegisterResponse.statusCode).toEqual(500)
    })
  })
})

describe('a wish', () => {
  it('should be added and retrieved', async () => {
    const wishType = 'go'
    const wish = new Wish()
    wish.type = wishType
    await wish.save()

    const wishList = await Wish.find({})

    expect(wishList.length).toBe(1)
    expect(wishList[0].type).toBe(wishType)
  })
})
