const util = require('../util')

describe('util.sleep', () => {
  it('should sleep or at least not crash', async () => {
    expect(await util.sleep(0)).toBe(true)
  })
})


describe('util.retry', () => {
  it('should repeat the same action with a delay', async() => {
    let response = 0
    // each time getResponse is called, we get a higher number
    const getResponse = () => {
      response = response + 1
      return response
    }

    expect(getResponse()).toBe(1)
    expect(getResponse()).toBe(2)
    expect(getResponse()).toBe(3)

    const action = () => {
      const value = getResponse()
      if (value < 8) {
        throw new Error('response is less than 8')
      } else {
        return value;
      }
    }
    expect(await util.retry(action, 5, 0)).toBe(8)
  })

  it('should throw original error if maximum retries has been reached', async() => {
    const failure = '¡FAIL!'
    try {
      await util.retry(() => { throw failure }, 10, 0)
      throw 'expecting a different error to be thrown'
    } catch (error) {
      expect(error).toBe(failure)
    }
  })
})
