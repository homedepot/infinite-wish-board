import axios from 'axios'

const expressDomain = process.env.REACT_APP_expressDomain || 'http://localhost:3002'

const getWishDetails = async (id) => {
  let response = await axios.get(`${expressDomain}/wishes/${id}`);
  return response.data;
}

const makeAWish = async(wish) => {
  let response = await axios.post(`${expressDomain}/wishes`, wish)
  return response.data;
}

export const getWishes = async (types, beginDate, endDate, sort) => {
  let typeParams = types && types.length ? `types=${types.toString()}` : '';
  beginDate = beginDate ? `&beginDate=${beginDate.toString()}` : '';
  endDate = endDate ? `&endDate=${endDate.toString()}` : '';
  sort = sort ? `&sort=${sort}` : '&sort=desc';
  let params = typeParams + beginDate + endDate + sort;

  const { data } = await axios.get(`${expressDomain}/wishes?${params}`)
  return data
}

export default {
  getWishDetails,
  makeAWish,
  getWishes
}
