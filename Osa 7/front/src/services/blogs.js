import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const get = async(id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const create = async(newObject) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async(id) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async(id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  setToken
}