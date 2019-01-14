import axios from 'axios'

const server = 'http://localhost:3000'

export { talkToServer }

function talkToServer () {
  let url = `${server}/handshake`
  return axios.get(url).then(response => response)
}
