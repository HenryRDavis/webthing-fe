import axios from "axios";

const axiosWithAuth = () => {
  const token = window.localStorage.getItem('token');
  return axios.create({
    baseURL: "https://website-thing.herokuapp.com/api",
    headers: {
    Authorization: token
    }  
  })
}

export default axiosWithAuth;