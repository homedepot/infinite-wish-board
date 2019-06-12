const request = require('supertest')

describe('Sanity test express', () => {
  let server
  beforeEach(() => {
    process.env.mongoUrl = 'mongodb://localhost:27017/test'
    server = require('./app')
  })

  afterEach(function() {
    server.close()
  })

  it('should boot up!', () => {
    request(server)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.log(res)
          throw err
        }
      })
  })
})
