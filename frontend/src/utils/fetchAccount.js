import axiosWithAuth from './axiosWithAuth'

function fetchAccountDetails (user) {
    const username = window.localStorage.getItem('username')
    
    return axiosWithAuth()
        .get(`/username/${ username.toLowerCase() }` )
        .then( res => { 
            return res
        }).catch( err => {
            console.log(err)
        })
}

export default fetchAccountDetails