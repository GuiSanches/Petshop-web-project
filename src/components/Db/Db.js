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
        const resp = await api.get('/login', {
            params: {
                email,
                password
            }
        })

        return resp.data
    },
    signUpClient: async (userData) => {
        const resp = await api.post('/create-user', userData)
        return resp.data
    },
    signUpAdmin: async (adminData) => {
        const resp = await api.post('/create-admin', adminData)
        return resp.data
    },
    getProductsShopLog: async (userID) => {

        const resp = await api.get(`/products-cart/${userID}`)

        return resp.data
    },

    getProducts: async _ => {
        const resp = await api.get(`/products`)

        return resp.data
    },
    getProductsHighlights: async _ => {
        const resp = await api.get('/products-highlights')

        return resp.data
    },
    getPromotions: async _ => {
        const resp = await api.get('/promotions')
        
        return resp.data
    },
    bookAppointment: async (ClientData, PetData) => {
        const resp = await api.post('/book-appointment', { ClientData, PetData })

        return resp.data
    },

    getAllFutureAppointments: async _ => {
        const resp = await api.get('/all-book')

        return resp.data
    }
}

export default backend