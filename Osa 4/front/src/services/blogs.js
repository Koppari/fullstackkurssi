import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default {
  getAll,
  setToken
}