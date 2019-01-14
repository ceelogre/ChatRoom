import axios from 'axios'

const server = 'http://localhost:3000'

export { sendSigninCredentials, sendSignupCredentials }

function sendSignupCredentials(data){
    let url=`${server}/users/signup`
    return axios.post(url, {'creds': data}).then(response => response.data)
}

function sendSigninCredentials(data){
    let url = `${server}/users/signin`
    return axios.post(url, {'creds': data}).then(
        response => response.data
    )
}