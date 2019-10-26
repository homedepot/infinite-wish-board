import axios from 'axios';
import WishDetailsService from './WishDetailsService.js';

jest.mock('axios')

describe('Wish details service', () => {
  const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'
  const wishId = '5d03fab52ef3030028d2cad2';
  const responseObject = {
    "child": {
      "firstName": "test2",
      "lastName": "test2",
      "age": 4,
      "hometown": "Atlanta",
      "illness": "sick"
    },
    "sponsor": {
      "links": []
    },
    "_id": "5d03fab52ef3030028d2cad2",
    "type": "go",
    "details": "to disneyland",
    "__v": 0
  }
  const responseArray = [responseObject]

  axios.get.mockImplementation((url) => {
    switch (url) {
      case `${expressDomain}/wishes/${wishId}`:
        return Promise.resolve({data: responseObject})
      case `${expressDomain}/wishes`:
      case `${expressDomain}/wishes?types=go,meet`:
        return Promise.resolve({data: responseArray})
      default:
        return Promise.reject(new Error('invalid endpoint'))
    }
  })
  it('should return wish details given an id', async () => {
    await WishDetailsService.getWishDetails(wishId);
    expect(axios.get).toHaveBeenCalledWith(`${expressDomain}/wishes/${wishId}`);
  })
  
  it('should make a wish when required', async () => {
    const wish = {
      "child": {
        "firstName": "test2",
        "lastName": "test2",
        "age": "4",
        "hometown": "Atlanta",
        "illness": "sick"
      },
      "type": "go",
      "details": "to disneyland"
    }
    axios.post = jest.fn(() => Promise.resolve({ data: wish }));

    await WishDetailsService.makeAWish(wish);
    expect(axios.post).toHaveBeenCalledWith(`${expressDomain}/wishes`, wish);
  })

  it('should get wishes', async () => {
    await WishDetailsService.getWishes();
    expect(axios.get).toHaveBeenCalledWith(`${expressDomain}/wishes`);
  })

  it('should make request with filter if required', async () => {
    await WishDetailsService.getWishes(['go', 'meet']);
    expect(axios.get).toHaveBeenCalledWith(`${expressDomain}/wishes?types=go,meet`);
  })
})
