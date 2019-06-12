const app = require("./app")

describe('Sanity test express', () => {
  it('should boot up!', () => {
    expect(app).toBeTruthy()
  })
})
