import axios from 'axios'
import jwt from 'jsonwebtoken'

const server = 'http://172.29.52.77:3000'

export { sendSigninCredentials, sendSignupCredentials }

function sendSignupCredentials(data){
    let url=`${server}/users/signup`
    return axios.post(url, {'creds': data}).then(response => response.data)
}

function sendSigninCredentials(data){

    let payload = {
        sub: data
    }
    let word = 'The penny dropped.'

    let signedCredentials = jwt.sign(payload, word, {
        'algorithm': 'HS256',
        expiresIn: '1d'
    })
    let url = `${server}/users/signin`
    return axios.post(url, {'creds':signedCredentials}).then(
        response => response.data
    )
}