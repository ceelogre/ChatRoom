import axios from 'axios'

const server = 'http://172.29.52.77:3000'

export { getAllMessages }

function getAllMessages (){
  let url = `${server}/chats`
  return axios.get(url).then(response => response.data)
}