import axios from 'axios'

const server = 'http://localhost:3000'

export { getAllMessages }

function getAllMessages (){
  let url = `${server}/chats`
  return axios.get(url).then(response => response.data)
}