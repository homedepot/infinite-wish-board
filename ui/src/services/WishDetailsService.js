import axios from 'axios';

const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'

const getWishDetails = async(id) => {
  let response = await axios.get(`${expressDomain}/wishes/${id}`);
  return response.data;
}

const makeAWish = async(wish) => {
  let response = await axios.post(`${expressDomain}/wishes`, wish)
  return response.data;
}

export default {
  getWishDetails,
  makeAWish
}