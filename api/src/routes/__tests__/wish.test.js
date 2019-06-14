const request = require('supertest')

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('../../app')
const Wish = require('../../db/Wish')

describe('Wish route', () => {
  const wishType = 'go'
  const firstWish = {
    child: {
      firstName: 'patrick',
      lastName: 'star',
      hometown: 'marietta',
      illness: 'crecent',
      age: '12'
    },
    type: wishType,
    details: 'i want to be a real star',
    sponsor: {
      name: 'krabs',
      logo: 'K',
      links: []
    }
  }
  const secondWish = {
    child: {
      firstName: 'patrick sdfasdf',
      lastName: 'star',
      hometown: 'marietta',
      illness: 'crecent',
      age: '12'
    },
    type: wishType,
    details: 'i am a goofy goober',
    sponsor: {
      name: 'krabs',
      logo: 'K',
      links: []
    }
  }

  beforeEach(async () => {
    await Wish.deleteMany({})
  })

  test('It should respond with an array of wishes', async () => {
    const newWish = new Wish(firstWish)
    await newWish.save()

    Wish.count({}, (err, count) => {
      expect(count).toBe(1)
    })
    const response = await request(app).get('/wishes')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0].type).toBe(wishType)
  })

  it('should be able to post a wish', async () => {
    const response = await request(app)
      .post('/wishes')
      .send(firstWish)

    expect(response.statusCode).toBe(201)
    expect(response.body.type).toBe(wishType)
    expect(response.body._id).toBeTruthy()
  })

  it('should be able to get a single wish by ID', async () => {
    const postResponse = await request(app)
      .post('/wishes')
      .send(firstWish)

    expect(postResponse.statusCode).toBe(201)

    const id = postResponse.body._id

    const getResponse = await request(app)
      .get(`/wishes/${id}`)
      .send(firstWish)

    expect(getResponse.body.type).toBe(wishType)
    expect(getResponse.body._id).toBeTruthy()
  })

  it('should be able to update (put) a wish', async () => {
    const postResponse = await request(app)
      .post('/wishes')
      .send(firstWish)

    expect(postResponse.statusCode).toBe(201)

    const id = postResponse._id

    const putResponse = await request(app)
      .post(`/wishes/${id}`)
      .send(secondWish)
  })

  describe('DEL /wishes/:id', () => {
    it('should be able to delete a wish', async () => {
      const newWish = new Wish(firstWish)
      await newWish.save()

      Wish.count({}, (err, count) => {
        expect(count).toBe(1)
      })
      const id = newWish._id

      const delResponse = await request(app).delete(`/wishes/${id}`)
      Wish.count({}, (err, count) => {
        expect(count).toBe(0)
      })
      expect(delResponse.status).toBe(200)
    })

    it('should return 404 if record not found', async () => {
      const delResponse = await request(app).delete("/wishes/123")
      expect(delResponse.status).toBe(500)
    })
  })
})
