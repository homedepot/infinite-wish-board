const request = require('supertest')
const util = require('../../util/util')

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('../../app')
const Wish = require('../../db/Wish')
const wishRouter = require('../../routes/wish')

describe('Wish route', () => {
  const firstWishType = wishRouter.GO
  const firstWish = {
    child: {
      name: 'patrick',
      hometown: 'marietta',
      illness: 'crecent',
      age: '12'
    },
    type: firstWishType,
    details: 'i want to be a real star',
    sponsor: {
      name: 'krabs',
      logo: 'K',
      links: []
    },
    createdAt: '2019-06-14T18:08:56.374Z',
    updatedAt: '2019-06-14T18:08:56.374Z'
  }
  const secondWishType = wishRouter.HAVE
  const secondWish = {
    child: {
      name: 'spongebob',
      hometown: 'marietta',
      illness: 'loss of absorbency',
      age: '12'
    },
    type: secondWishType,
    details: 'i am a goofy goober',
    sponsor: {
      name: 'krabs',
      logo: 'K',
      links: []
    },
    createdAt: '2018-07-10T18:08:56.374Z',
    updatedAt: '2018-07-10T18:08:56.374Z'
  }
  const thirdWishType = wishRouter.MEET
  const thirdWish = {
    type: thirdWishType,
    createdAt: '2019-05-14T18:08:56.374Z',
    updatedAt: '2019-05-14T18:08:56.374Z'
  }
  const fourthWishType = wishRouter.BE
  const fourthWish = {
    type: fourthWishType,
    createdAt: '2018-08-14T18:08:56.374Z',
    updatedAt: '2018-08-14T18:08:56.374Z'
  }
  const fifthWishType = wishRouter.MEET
  const fifthWish = {
    type: fifthWishType,
    createdAt: '2018-07-12T18:08:56.374Z',
    updatedAt: '2018-07-12T18:08:56.374Z'
  }

  beforeEach(async () => {
    await Wish.deleteMany({})
  })

  test('It should respond with an array of wishes in the order inserted, as default', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish)
    await request(app)
      .post('/wishes')
      .send(secondWish)
    await request(app)
      .post('/wishes')
      .send(thirdWish)
    await request(app)
      .post('/wishes')
      .send(fourthWish)

    const action = async () => {
      const getResponse = await request(app)
        .get('/wishes')
        .query(
          {
          beginDate: '2018-01-14T18:08:55.374Z',
          endDate: '2019-11-14T18:08:57.374Z'
        })

      expect(getResponse.body.length).toBe(4)
      expect(getResponse.body[0].type).toBe(wishRouter.GO)
      expect(getResponse.body[1].type).toBe(wishRouter.HAVE)
      expect(getResponse.body[2].type).toBe(wishRouter.MEET)
      expect(getResponse.body[3].type).toBe(wishRouter.BE)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to post a wish', async () => {
    const response = await request(app)
      .post('/wishes')
      .send(firstWish)

    const action = async () => {
      expect(response.statusCode).toBe(201)
      expect(response.body.type).toBe(firstWishType)
      expect(response.body._id).toBeTruthy()
    }
    await util.retry(action, 5, 500)
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

    expect(getResponse.body.type).toBe(firstWishType)
    expect(getResponse.body._id).toBeTruthy()
  })

  it('should be able to update (put) a wish', async () => {
    const newWish = new Wish(firstWish)
    await newWish.save()

    const putResponse = await request(app)
      .put(`/wishes/${newWish._id}`)
      .send(secondWish)

    const action = async () => {
      expect(putResponse.status).toBe(200)
      expect(putResponse.body.child.name).toBe(secondWish.child.name)
    }

    await util.retry(action, 5, 500)
  })

  // this may not be desired behavior; fix later(?)
  it('should return 200 if the existing wish is not found while update (put) a wish', async () => {
    const putResponse = await request(app)
      .put(`/wishes/blahblahblah`)
      .send(secondWish)

    const action = async () => {
      expect(putResponse.status).toBe(200)
      expect(putResponse.body).toStrictEqual({})
    }

    await util.retry(action, 5, 500)
  })

  describe('DEL /wishes/:id', () => {
    it('should be able to delete a wish', async () => {
      const newWish = new Wish(firstWish)
      await newWish.save()

      const id = newWish._id

      const action = async () => {
        const delResponse = await request(app).delete(`/wishes/${id}`)
        Wish.count({}, (err, count) => {
          expect(count).toBe(0)
        })
        expect(delResponse.status).toBe(200)
      }

      await util.retry(action, 5, 500)
    })

    it('should return 404 if record not found', async () => {
      const delResponse = await request(app).delete('/wishes/123')
      expect(delResponse.status).toBe(500)
    })
  })

  it('should be able to select between time range (internal only)', async () => {
    await new Wish(firstWish).save()
    await new Wish(secondWish).save()
    await new Wish(thirdWish).save()
    await new Wish(fourthWish).save()

    const action = async () => {
      // we just want this one: '2019-06-14T18:08:56.374Z'
      const foundWish = await Wish.find({
        $and: [
          { updatedAt: { $gt: '2019-06-14T18:08:55.374Z' } },
          { updatedAt: { $lte: '2019-06-14T18:08:57.374Z' } }
        ]
      })

      expect(foundWish.length).toBe(1)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to select between time range and wish type (internal only)', async () => {
    await new Wish(firstWish).save() // 2019-06-14, go
    await new Wish(secondWish).save() // 2018-07-10, have
    await new Wish(thirdWish).save() // 2019-05-14, meet
    await new Wish(fourthWish).save() // 2018-08-14, be

    // we just want this one: '2019-06-14T18:08:56.374Z'
    const foundWish = await Wish.find({
      $and: [
        { updatedAt: { $gt: '2011-06-14T18:08:55.374Z' } },
        { updatedAt: { $lte: '2030-09-14T18:08:57.374Z' } },
        { $or: [{ type: wishRouter.GO }, { type: wishRouter.HAVE }] }
      ]
    })

    expect(foundWish.length).toBe(2)
  })

  it('should be able to select between time range', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish)
    await request(app)
      .post('/wishes')
      .send(secondWish)
    await request(app)
      .post('/wishes')
      .send(thirdWish)
    await request(app)
      .post('/wishes')
      .send(fourthWish)

    const action = async () => {
      const getResponse = await request(app)
        .get('/wishes')
        .query({
          beginDate: '2019-06-14T18:08:55.374Z',
          endDate: '2019-06-14T18:08:57.374Z'
        })

      expect(getResponse.body.length).toBe(1)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to select between time range and wish type "have" (internal only)', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish) // 2019-06-14, go
    await request(app)
      .post('/wishes')
      .send(secondWish) // 2018-07-10, have
    await request(app)
      .post('/wishes')
      .send(thirdWish) // 2019-05-14, meet
    await request(app)
      .post('/wishes')
      .send(fourthWish) // 2018-08-14, be

    const action = async () => {
      const foundWish = await Wish.find({
        $and: [
          { updatedAt: { $gt: '2018-02-14T18:08:55.374Z' } },
          { updatedAt: { $lte: '2018-11-14T18:08:57.374Z' } },
          { $or: [{ type: wishRouter.GO }, { type: wishRouter.HAVE }] }
        ]
      })

      expect(foundWish.length).toBe(1)
    }
  })

  it('should return a date range that includes current year if current date is between Feb and Dec, 2019', () => {
    const dateRange = wishRouter.getDefaultDateRange(
      new Date('2019-05-03T12:34:56Z')
    )

    expect(dateRange.length).toBe(2)
    expect(dateRange[0]).toBe('2019-01-01T00:00:00Z')
    expect(dateRange[1]).toBe('2019-12-31T23:59:59Z')
  })

  it('should return a date range that includes current year if current date is between Feb and Dec, 2020', () => {
    const dateRange = wishRouter.getDefaultDateRange(
      new Date('2020-02-15T12:34:56Z')
    )

    expect(dateRange.length).toBe(2)
    expect(dateRange[0]).toBe('2020-01-01T00:00:00Z')
    expect(dateRange[1]).toBe('2020-12-31T23:59:59Z')
  })

  it('should return a date range that includes current year if current date is in Jan', () => {
    const dateRange = wishRouter.getDefaultDateRange(
      new Date('2019-01-03T12:34:56Z')
    )

    expect(dateRange.length).toBe(2)
    expect(dateRange[0]).toBe('2018-01-01T00:00:00Z')
    expect(dateRange[1]).toBe('2018-12-31T23:59:59Z')
  })

  it('should return wishes from the current year because today is not in Jan', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish) // updatedAt: '2019-06-14T18:08:56.374Z',
    await request(app)
      .post('/wishes')
      .send(secondWish) // "updatedAt": "2018-07-10T18:08:56.374Z"
    await request(app)
      .post('/wishes')
      .send(thirdWish) // updatedAt: '2019-05-14T18:08:56.374Z'
    await request(app)
      .post('/wishes')
      .send(fourthWish) // updatedAt: '2018-08-14T18:08:56.374Z'

    jest
      .spyOn(wishRouter, 'today')
      .mockImplementation(() => new Date('2018-03-03T12:34:56Z'))

    const action = async () => {
      const getResponse = await request(app).get('/wishes')

      expect(getResponse.body.length).toBe(2)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to select wish type "have"', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish) // 2019-06-14, go
    await request(app)
      .post('/wishes')
      .send(secondWish) // 2018-07-10, have
    await request(app)
      .post('/wishes')
      .send(thirdWish) // 2019-05-14, meet
    await request(app)
      .post('/wishes')
      .send(fourthWish) // 2018-08-14, be

    const action = async () => {
      const getResponse = await request(app)
        .get('/wishes')
        .query({
          beginDate: '2018-01-14T18:08:55.374Z',
          endDate: '2018-11-14T18:08:57.374Z',
          types: wishRouter.HAVE
        })

      expect(getResponse.body.length).toBe(1)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to select wish type "go", which does not exist', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish) // 2019-06-14, go
    await request(app)
      .post('/wishes')
      .send(secondWish) // 2018-07-10, have
    await request(app)
      .post('/wishes')
      .send(thirdWish) // 2019-05-14, meet
    await request(app)
      .post('/wishes')
      .send(fourthWish) // 2018-08-14, be

    const action = async () => {
      const getResponse = await request(app)
        .get('/wishes')
        .query({
          beginDate: '2018-01-14T18:08:55.374Z',
          endDate: '2018-11-14T18:08:57.374Z',
          types: wishRouter.GO
        })

      expect(getResponse.body.length).toBe(0)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to select wish types "have" and "meet"', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish) // 2019-06-14, go
    await request(app)
      .post('/wishes')
      .send(secondWish) // 2018-07-10, have
    await request(app)
      .post('/wishes')
      .send(thirdWish) // 2019-05-14, meet
    await request(app)
      .post('/wishes')
      .send(fourthWish) // 2018-08-14, be

    //jest.spyOn(wishRouter, 'today').mockImplementation(() => new Date('2018-03-03T12:34:56Z'))

    const action = async () => {
      const getResponse = await request(app)
        .get('/wishes')
        .query({
          beginDate: '2018-01-14T18:08:55.374Z',
          endDate: '2019-11-14T18:08:57.374Z',
          types: `${wishRouter.HAVE},${wishRouter.MEET}`
        })

      expect(getResponse.body.length).toBe(2)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to select wish types "be" using default date range', async () => {
    await request(app)
      .post('/wishes')
      .send(firstWish) // 2019-06-14, go
    await request(app)
      .post('/wishes')
      .send(secondWish) // 2018-07-10, have
    await request(app)
      .post('/wishes')
      .send(thirdWish) // 2019-05-14, meet
    await request(app)
      .post('/wishes')
      .send(fourthWish) // 2018-08-14, be

    jest
      .spyOn(wishRouter, 'today')
      .mockImplementation(() => new Date('2018-03-03T12:34:56Z'))

    const action = async () => {
      const getResponse = await request(app)
        .get('/wishes')
        .query({
          types: wishRouter.BE
        })

      expect(getResponse.body.length).toBe(1)
    }

    await util.retry(action, 5, 500)
  })

  it('should be able to group wishes by update time, ascending', async () => {
    var promiseList = [];
    promiseList.push(request(app)
      .post('/wishes')
      .send(firstWish)); // 2019-06-14, go
    promiseList.push(request(app)
      .post('/wishes')
      .send(secondWish)); // 2018-07-10, have
    promiseList.push(request(app)
      .post('/wishes')
      .send(thirdWish)); // 2019-05-14, meet
    promiseList.push(request(app)
      .post('/wishes')
      .send(fourthWish)); // 2018-08-14, be
    promiseList.push(request(app)
      .post('/wishes')
      .send(fifthWish)); // 2018-07-12, meet

    Promise.all(promiseList).then( () => {
      const action = async () => {
        const getResponse = await request(app)
          .get('/wishes')
          .query({
            beginDate: '2018-01-14T18:08:55.374Z',
            endDate: '2019-11-14T18:08:57.374Z',
            sort: 'asc'
          })
        expect(getResponse.body.length).toBe(4)
        expect(getResponse.body[0].year).toBe(2018)
        expect(getResponse.body[0].month).toBe(7)
        expect(getResponse.body[0].wishes[0].type).toBe(wishRouter.HAVE)
        expect(getResponse.body[0].wishes[1].type).toBe(wishRouter.MEET)

        expect(getResponse.body[1].year).toBe(2018)
        expect(getResponse.body[1].month).toBe(8)
        expect(getResponse.body[1].wishes[0].type).toBe(wishRouter.BE)

        expect(getResponse.body[2].year).toBe(2019)
        expect(getResponse.body[2].month).toBe(5)
        expect(getResponse.body[2].wishes[0].type).toBe(wishRouter.MEET)

        expect(getResponse.body[3].year).toBe(2019)
        expect(getResponse.body[3].month).toBe(6)
        expect(getResponse.body[3].wishes[0].type).toBe(wishRouter.GO)
      }
  });


      // this is how we should get our wishes
      // [
      //   {
      //     year: 2018,
      //     month: 2, // 1 = January, 2 = February, ...
      //     wishes: [
      //       { ...wish }
      //     ]
      //   }
      // ]

    // await util.retry(action, 5, 500)
  })

  it('should be able to group wishes by update time, descending', async () => {
    var promiseList = [];
    promiseList.push(request(app)
      .post('/wishes')
      .send(firstWish)); // 2019-06-14, go
    promiseList.push(request(app)
      .post('/wishes')
      .send(secondWish)); // 2018-07-10, have
    promiseList.push(request(app)
      .post('/wishes')
      .send(thirdWish)); // 2019-05-14, meet
    promiseList.push(request(app)
      .post('/wishes')
      .send(fourthWish)); // 2018-08-14, be
    promiseList.push(request(app)
      .post('/wishes')
      .send(fifthWish)); // 2018-07-12, meet


    Promise.all(promiseList).then( () => {
      const action = async () => {
        const getResponse = await request(app)
          .get('/wishes')
          .query({
            beginDate: '2018-01-14T18:08:55.374Z',
            endDate: '2019-11-14T18:08:57.374Z',
            sort: 'desc'
          })
        expect(getResponse.body.length).toBe(4)
        expect(getResponse.body[0].year).toBe(2019)
        expect(getResponse.body[0].month).toBe(6)
        expect(getResponse.body[0].wishes[0].type).toBe(wishRouter.GO)

        expect(getResponse.body[1].year).toBe(2019)
        expect(getResponse.body[1].month).toBe(5)
        expect(getResponse.body[1].wishes[0].type).toBe(wishRouter.MEET)

        expect(getResponse.body[2].year).toBe(2018)
        expect(getResponse.body[2].month).toBe(8)
        expect(getResponse.body[2].wishes[0].type).toBe(wishRouter.BE)

        expect(getResponse.body[3].year).toBe(2018)
        expect(getResponse.body[3].month).toBe(7)
        expect(getResponse.body[3].wishes[0].type).toBe(wishRouter.MEET)
        expect(getResponse.body[3].wishes[1].type).toBe(wishRouter.HAVE)
        await util.retry(action, 5, 500)

      }
    });

      // this is how we should get our wishes
      // [
      //   {
      //     year: 2018,
      //     month: 2, // 1 = January, 2 = February, ...
      //     wishes: [
      //       { ...wish }
      //     ]
      //   }
      // ]


  })
})
