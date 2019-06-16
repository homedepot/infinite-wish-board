import axios from 'axios'

const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'

const getWishDetails = async(id) => {
  try {
    let response = await axios.get(`${expressDomain}/wishes/${id}`);
    return response.data;
  } catch(e) {
    console.log(`error ${e}`);
    return 'error'
  }
}

const makeAWish = async(wish) => {
  try {
    let response = await axios.post(`${expressDomain}/wishes`, wish)
    return response.data;
  } catch (e) {
    console.log(`error ${e}`);
    return 'error';
  }

}

export const getWishes = async () => {
  // TODO query param options
  const { data } = await axios.get(`${expressDomain}/wishes`)
  return data
}

export default {
  getWishDetails,
  makeAWish
}
