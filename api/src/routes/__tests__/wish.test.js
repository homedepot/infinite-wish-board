const request = require("supertest")
const mongoose = require("mongoose")

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('../../app')
const Wish = require('../../db/Wish')
const wishRouter = require('../../routes/wish')

describe("Wish route", () => {
  const firstWishType = 'go'
  const firstWish = {
    child: {
      firstName: 'patrick',
      lastName: 'star',
      hometown: 'marietta',
      illness: 'crecent',
      age: '12',
    },
    type: firstWishType,
    details: 'i want to be a real star',
    sponsor: {
      name: 'krabs',
      logo: 'K',
      links: []
    },
    createdAt: '2019-06-14T18:08:56.374Z',
    updatedAt: '2019-06-14T18:08:56.374Z',    
    }
  const secondWishType = 'see'
  const secondWish = {
    child: {
      firstName: 'spongebob',
      lastName: 'squarepants',
      hometown: 'atlantic ocean',
      illness: 'non-absorbent',
      age: '12',
    },
    type: secondWishType,
    details: 'i am a goofy goober',
    sponsor: {
      name: 'krabs',
      logo: 'K',
      links: []
    },
    "createdAt": "2018-07-10T18:08:56.374Z",
    "updatedAt": "2018-07-10T18:08:56.374Z",
  }
  const thirdWishType = 'meet'
  const thirdWish = {
    type: thirdWishType,
    createdAt: '2010-06-14T18:08:56.374Z',
    updatedAt: '2019-05-14T18:08:56.374Z',    
  }
  const fourthWishType = 'be'
  const fourthWish = {
    type: fourthWishType,
    createdAt: '2017-08-14T18:08:56.374Z',
    updatedAt: '2018-08-14T18:08:56.374Z',    
  }

  beforeEach(async () => {
    await Wish.deleteMany({})
  })
  
  xtest("It should respond with an array of wishes", async () => {
    const newWish = new Wish()
    newWish.type = firstWishType
    await newWish.save()

    const response = await request(app).get("/wishes")
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0].type).toBe(firstWishType)
  })

  it('should be able to post a wish', async() => {
    const response = await request(app).post("/wishes").send(firstWish)

    expect(response.statusCode).toBe(201)
    expect(response.body.type).toBe(firstWishType)
    expect(response.body._id).toBeTruthy()
  })

  it('should be able to get a single wish by ID', async() => {
    const postResponse = await request(app).post("/wishes").send(firstWish)

    expect(postResponse.statusCode).toBe(201)

    const id = postResponse.body._id

    const getResponse = await request(app).get(`/wishes/${id}`).send(firstWish)

    expect(getResponse.body.type).toBe(firstWishType)
    expect(getResponse.body._id).toBeTruthy()
  })

  it('should be able to update (put) a wish', async() => {
    const postResponse = await request(app).post("/wishes").send(firstWish)

    expect(postResponse.statusCode).toBe(201)

    const id = postResponse._id

    const putResponse = await request(app).post(`/wishes/${id}`).send(secondWish)
  })

  xit('should be able to delete a wish', async() => {
    const postResponse = await request(app).post("/wishes").send(firstWish)
    expect(postResponse.statusCode).toBe(201)
    const id = postResponse._id

    const putResponse = await request(app).delete(`/wishes/${id}`)
    expect(putResponse.statusCode).toBe(204)

    const response = await request(app).get("/wishes")
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(0)
  })

  it('should be able to select between time range (internal only)', async () => {
    await (new Wish(firstWish).save())
    await (new Wish(secondWish).save())
    await (new Wish(thirdWish).save())
    await (new Wish(fourthWish).save())

    // we just want this one: '2019-06-14T18:08:56.374Z'
    const foundWish = await Wish.find({
      '$and': [
        { updatedAt: { '$gt': '2019-06-14T18:08:55.374Z' } },
        { updatedAt: { '$lte': '2019-06-14T18:08:57.374Z' } },
      ]
    })

    expect(foundWish.length).toBe(1)
  })

  it('should be able to select between time range', async () => {
    await request(app).post("/wishes").send(firstWish)
    await request(app).post("/wishes").send(secondWish)
    await request(app).post("/wishes").send(thirdWish)
    await request(app).post("/wishes").send(fourthWish)

    const postResponse = await request(app)
      .get("/wishes")
      .query({
        beginDate: '2019-06-14T18:08:55.374Z',
        endDate: '2019-06-14T18:08:57.374Z',
      })

    expect(postResponse.body.length).toBe(1)
  })

  it('should return a date range that includes current year if current date is between Feb and Dec, 2019', () => {
    const dateRange = wishRouter.getDefaultDateRange(new Date('2019-05-03T12:34:56Z'));

    expect(dateRange.length).toBe(2)
    expect(dateRange[0]).toBe('2019-01-01T00:00:00Z')
    expect(dateRange[1]).toBe('2019-12-31T23:59:59Z')
  })

  it('should return a date range that includes current year if current date is between Feb and Dec, 2020', () => {
    const dateRange = wishRouter.getDefaultDateRange(new Date('2020-02-15T12:34:56Z'));

    expect(dateRange.length).toBe(2)
    expect(dateRange[0]).toBe('2020-01-01T00:00:00Z')
    expect(dateRange[1]).toBe('2020-12-31T23:59:59Z')
  })

  it('should return a date range that includes current year if current date is in Jan', () => {
    const dateRange = wishRouter.getDefaultDateRange(new Date('2019-01-03T12:34:56Z'));

    expect(dateRange.length).toBe(2)
    expect(dateRange[0]).toBe('2018-01-01T00:00:00Z')
    expect(dateRange[1]).toBe('2018-12-31T23:59:59Z')
  })

  it('should return wishes from the current year because today is not in Jan', async () => {
    await request(app).post("/wishes").send(firstWish) // updatedAt: '2019-06-14T18:08:56.374Z',
    await request(app).post("/wishes").send(secondWish) // "updatedAt": "2018-07-10T18:08:56.374Z"
    await request(app).post("/wishes").send(thirdWish) // updatedAt: '2010-06-14T18:08:56.374Z'
    await request(app).post("/wishes").send(fourthWish) // updatedAt: '2018-08-14T18:08:56.374Z'

    jest.spyOn(wishRouter, 'today').mockImplementation(() => new Date('2019-03-03T12:34:56Z'))
    const postResponse = await request(app)
      .get("/wishes")

    expect(postResponse.body.length).toBe(1)
  })
})
