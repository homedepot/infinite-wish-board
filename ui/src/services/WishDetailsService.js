import axios from 'axios';

const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'

const getWishDetails = async(id) => {
  return axios
    .get(`${expressDomain}/wishes/${id}`)
    .then(response => {
      return response.data
    })
}

const makeAWish = async(wish) => {
  return axios
    .post(`${expressDomain}/wishes`, wish)
    .then(response => {
      return response.data
    })
}

export default {
  getWishDetails,
  makeAWish
}