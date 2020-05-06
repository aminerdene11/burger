import axios from "axios"

const instance = axios.create({

baseURL:"https://burger-9c06f.firebaseio.com/"

})

export default instance;