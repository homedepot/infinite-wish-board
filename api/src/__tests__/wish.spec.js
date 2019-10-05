const { expect } = require('chai')

const { axios } = require('axios')

const API_URL = 'http://localhost:8000/graphql'
const db = require('../bootstrap-mongoose.js')

let db

before(async () => {
  db = await db('mongodb://localhost:27017/mytestdatabase')
})

after(async () => {
  await db.connection.close()
})

describe('Wishes', () => {
  describe('wishes (limit: INT)', () => {
    it('returns a list of wishes', async () => {
      const expectedResult = {
        data: {
          wishes: [
            {
              details: 'test',
              type: 'GO',
              child: {
                name: 'Bob Saget',
                age: 7,
                illness: 'flu',
                hometown: 'Atlanta'
              }
            },
            {
              details: 'test 2',
              type: 'GO',
              child: {
                name: 'John Stamos',
                age: 7,
                illness: 'flu',
                hometown: 'Atlanta'
              }
            }
          ]
        }
      }

      const result = await axios.post(API_URL, {
        query: `
          query {
            wishes {
              details
              type
              child {
                name
                age
                illness
                hometown
              }
            }
          `
      })

      expect(result.data).to.eql(expectedResult)
    })
  })
})
