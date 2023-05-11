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

// get podcasts
export const getPodcasts = () => {
    return fetch(server+'/podcast/all')
}

// get episodes of podcasts
export const getEpisodes = (id) => {
    return fetch(server+'/podcast/episodes/'+id)
}

// get 1 episode details
export const getEpisodeDetails = (feedId, episodeId) => {
    return fetch(`${server}/podcast/episode/${feedId}/${episodeId}`)
}

// get default transcription
export const getDefaultTranscription = (transUrl) => {
    return fetch(server+'/podcast/default-transcription', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({transUrl})
    })
}

// get AI transcription
export const getAITranscription = (enclosureUrl) => {
    return fetch(server+'/podcast/ai-transcription', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({enclosureUrl})
    })
}


// get author
export const getAuthor = (feedId) => {
    return fetch(server+'/podcast/author/'+feedId)
}
