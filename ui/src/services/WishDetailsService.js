import axios from 'axios';

const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'

const getWishDetails = async(id) => {
  return axios
    .get(`${expressDomain}/wishes/${id}`)
    .then(response => {
      return response
    })
}

export default {
  getWishDetails
}