import { getCookie } from "../utils/cookie"
const server = process.env.REACT_APP_SERVER

// Sign in 
export const signin = (data) => {
    return fetch(server+'/auth/signin', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

}

// Sign up 
export const signup = (data) => {
    return fetch(server+'/auth/signup', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

}

// validate 
export const validate = (token) => {
    return fetch(server+'/auth/validate', {
        method : 'GET',
        headers : {
            token : getCookie('user')
        }
    })
}

// save project
export const saveProject = (data) => {
    return fetch(server+'/project/add', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'token' : `${getCookie('user')}`
        },
        body: JSON.stringify(data)
    })
}
// get project
export const getProjects = () => {
    return fetch(server+'/project/all', {
        method: 'GET',
        headers: {
            'token' : `${getCookie('user')}`
        }
    })
}