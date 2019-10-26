import axios from 'axios'
import { validateWishDetail } from '../validation/validator'

const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'

const getWishDetails = async (id) => {
  let response = await axios.get(`${expressDomain}/wishes/${id}`);
  return response.data;
}

const makeAWish = async(wish) => {
  let response = await axios.post(`${expressDomain}/wishes`, wish)
  return response.data;
}

function markIncompleteWishes(data) {
  if (data instanceof Array) {
    data.forEach(wish => {
      wish.isIncomplete = validateWishDetail(wish, true).length > 0
    })
  }
}

export const getWishes = async (types) => {
  let typeParams = types && types.length ? `?types=${types.toString()}` : '';
  // TODO query param options
  const { data } = await axios.get(`${expressDomain}/wishes${typeParams}`)
  markIncompleteWishes(data)
  return data
}

export default {
  getWishDetails,
  makeAWish,
  getWishes
}
