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
})
