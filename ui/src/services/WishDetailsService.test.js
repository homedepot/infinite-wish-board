import axios from 'axios';
import WishDetailsService from './WishDetailsService.js';

jest.mock('axios', () => ({
  get: jest.fn(() => {
    return 'Mock response'
  })
}));

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
  beforeEach(() => {
    axios.get = jest.fn(() => Promise.resolve({ data: responseObject }));
  });

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

  it('should edit a wish when required', async () => {
    const wish = {
      "child": {
        "firstName": "test2",
        "lastName": "test2",
        "age": "4",
        "hometown": "Not Atlanta",
        "illness": "sick"
      },
      "type": "go",
      "details": "to disneyland"
    }

    axios.put = jest.fn(() => Promise.resolve({ data: wish }));
    const response = await WishDetailsService.editAWish(wishId, wish);
    expect(axios.put).toHaveBeenCalledWith(`${expressDomain}/wishes/${wishId}`, wish);
    expect(response.child.hometown).toEqual('Not Atlanta')
  });

  it('should get wishes', async () => {
    await WishDetailsService.getWishes();
    expect(axios.get).toHaveBeenCalledWith(`${expressDomain}/wishes`);
  })

  it('should make request with filter if required', async () => {
    await WishDetailsService.getWishes(['go', 'meet']);
    expect(axios.get).toHaveBeenCalledWith(`${expressDomain}/wishes?types=go,meet`);
  })
})
