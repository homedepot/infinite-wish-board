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
    const wish = new Wish({
      child: {
        name: 'patrick',
        hometown: 'marietta',
        illness: 'crecent',
        age: '12'
      },
      details: 'i want to be a real star',
      sponsor: {
        name: 'krabs',
        logo: 'K',
        links: []
      }
    })
    wish.type = wishType
    await wish.save()

    const wishList = await Wish.find({})

    expect(wishList.length).toBe(1)
    expect(wishList[0].type).toBe(wishType)
  })

  it('should accept diacritics in child\'s name', async () => {
    const response = await request(app)
      .post('/wishes')
      .send({
        child: {
          name: 'Sørina José Françios Zoë Mary-Jo Jokūbas Siân Kšthe Fañch',
          hometown: 'marietta',
          illness: 'crecent',
          age: '12'
        },
        type: 'go',
        details: 'i want to be a real star',
        sponsor: {
          name: 'krabs',
          logo: 'K',
          links: []
        }
      })

    const wishList = await Wish.find({})

    expect(response.status).toBe(201)
    expect(wishList[0].child.name).toBe('Sørina José Françios Zoë Mary-Jo Jokūbas Siân Kšthe Fañch')
  })

  it('should return 422 and error message for nameValidation \'Child\'s name required\'', async () => {
    const response = await request(app)
      .post('/wishes')
      .send({
        child: {
          name: '',
          hometown: 'marietta',
          illness: 'crecent',
          age: '12'
        },
        type: 'go',
        details: 'i want to be a real star',
        sponsor: {
          name: 'krabs',
          logo: 'K',
          links: []
        }
      })

    expect(response.status).toBe(422)
    expect(response.body.errors['child.name'].message).toBe('Child\'s name required')
  })

  /*
   * Commented out on 10/18/2019 by Winston R. Milling
   * To be reinstated when sponsor name becomes required. 
   * As of this comment there is no input for sponsor name in the submission workflow, 
   * only in the maintenance/admin workflow
   */
  //it('should return 422 and error message for nameValidation \'Sponsor\'s name required\'', async () => {
  //  const response = await request(app)
  //  .post('/wishes')
  //  .send({
  //    child: {
  //      name: 'patrick',
  //      hometown: 'marietta',
  //      illness: 'crecent',
  //      age: '12'
  //    },
  //    type: 'go',
  //    details: 'i want to be a real star',
  //    sponsor: {
  //      name: '',
  //      logo: 'K',
  //      links: []
  //    }
  //  })
  //
  //  expect(response.status).toBe(422)
  //  expect(response.body.errors['sponsor.name'].message).toBe('Sponsor\'s name required')
  //})

  it('should return 422 and error message for child\'s nameValidation \'Name must contain only letters of the alphabet\'', async () => {
    const response = await request(app)
      .post('/wishes')
      .send({
        child: {
          name: 'patrick5',
          hometown: 'marietta',
          illness: 'crecent',
          age: '12'
        },
        type: 'go',
        details: 'i want to be a real star',
        sponsor: {
          name: 'krabs5',
          logo: 'K',
          links: []
        }
      })

    expect(response.status).toBe(422)
    expect(response.body.errors['child.name'].message).toBe('Name must contain only letters of the alphabet')
  })
})
