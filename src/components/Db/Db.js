import axios from 'axios'

const PORT = 8080
const URL = `http://127.0.0.1:${PORT}`

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

const backend = {
    signIn: async (email, password) => {
        const resp = await api.post('/login', {
            email,
            password
        })

        return resp.data
    },
    signUp: async(userData) => {

        const resp = await api.post('/create-user', userData)
        console.log(userData)
    },
    getProductsShopLog: async(userID) => {

        const resp = await api.post(`/products-cart/${userID}`)
        
        return resp.data
    }
}

export default backend