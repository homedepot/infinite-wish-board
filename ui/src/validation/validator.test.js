import { validateWishDetail } from '../validation/validator'

describe ('Strict Validator', ()=> {
  let wishDetail
  beforeEach(() => {
    wishDetail = {
      child: {
        name: "Suzy",
        age: 5,
        hometown: "Denver",
        illness: "sick"
      },
      sponsor: {
        links: ['homedepot.com']
      },
      _id: "5db4b914a502cf002aed65b5",
      type: "meet",
      details: "I want to meet Minnie Mouse",
      createdAt: "2019-10-26T21:22:28.979Z",
      updatedAt: "2019-10-26T21:22:28.979Z",
      __v: 0
    }
  });

  it ('should pass when wish and child are complete', () => {
    const errors = validateWishDetail(wishDetail, true)
    expect(errors.length).toBe(0)
  })

  it ('should fail when wish.type is empty', () => {
    wishDetail.type = ''
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('type')
    expect(error.message).toBe('type must be either go, meet, be or have.')
  })

  it ('should fail when wish.type is invalid value', () => {
    wishDetail.type = 'do'
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('type')
    expect(error.message).toBe('type must be either go, meet, be or have.')
  })

  it ('should fail when wish.type is empty', () => {
    wishDetail.type = ''
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('type')
    expect(error.message).toBe('type must be either go, meet, be or have.')
  })

  it ('should fail when wish.details is empty', () => {
    wishDetail.details = ''
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('details')
    expect(error.message).toBe('details is required.')
  })

  it ('should fail when wish.sponsor.links is empty', () => {
    wishDetail.sponsor.links = []
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('sponsor.links')
    expect(error.message).toBe('sponsor.links must have a minimum length of 1.')
  })

  it ('should fail when wish.sponsor.links is not string', () => {
    wishDetail.sponsor.links = [1]
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('sponsor.links.0')
    expect(error.message).toBe('sponsor.links.0 must be of type String.')
  })

  it ('should fail when wish.child.name is empty', () => {
    wishDetail.child.name = ''
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('child.name')
    expect(error.message).toBe('child.name is required.')
  })

  it ('should fail when wish.child.age is too old', () => {
    wishDetail.child.age = 18
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('child.age')
    expect(error.message).toBe('child.age must be between 2 and 17.')
  })

  it ('should fail when wish.child.age is too young', () => {
    wishDetail.child.age = 1
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('child.age')
    expect(error.message).toBe('child.age must be between 2 and 17.')
  })

  it ('should fail when wish.child.hometown is empty', () => {
    wishDetail.child.hometown = ''
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('child.hometown')
    expect(error.message).toBe('child.hometown is required.')
  })

  it ('should fail when wish.child.illness is empty', () => {
    wishDetail.child.illness = ''
    const errors = validateWishDetail(wishDetail)
    expect(errors.length).toBe(1)
    const error = errors[0]
    expect(error.path).toBe('child.illness')
    expect(error.message).toBe('child.illness is required.')
  })


})