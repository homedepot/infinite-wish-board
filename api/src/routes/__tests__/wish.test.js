const request = require("supertest")
const mongoose = require("mongoose")

process.env.mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/test'

const app = require('../../app')
const Wish = require('../../db/Wish')

describe("GET / ", () => {

  beforeEach(async () => {
    await Wish.remove({})
  })
  
  test("It should respond with an array of wishes", async () => {
    const wishType = 'go'
    const wish = new Wish()
    wish.type = wishType
    await wish.save()

    const response = await request(app).get("/wishes");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1)
    expect(response.body[0].type).toBe(wishType)
  });
});