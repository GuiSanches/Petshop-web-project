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
    AddProduct: async (data) => {
        const resp = await api.post('/add-product', { data })
    },
    AddService: async (data) => {
        const resp = await api.post('/add-service', { data })
    },
    getProducts: async _ => {
        const resp = await api.get(`/products`)

        return resp.data
    },
    getServices: async _ => {
        const resp = await api.get(`/services`)

        return resp.data
    },
    updateProduct: async ({ _id, ...Product }) => {
        const resp = await api.post(`/products/${_id}`, { Product })

        return resp.data
    },
    updateService: async ({ _id, ...Product }) => {
        const resp = await api.post(`/services/${_id}`, { Product })

        return resp.data
    },
    deleteProduct: async _id => {
        const resp = await api.post(`/delete-product/${_id}`)

        return resp.data
    },
    deleteService: async _id => {
        const resp = await api.post(`/delete-service/${_id}`)

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
    getAppointmentDetail: async (AppointmentID) => {
        const resp = await api.get(`/appointment-info/${AppointmentID}`)

        return resp.data
    },
    bookAppointment: async (ClientData, PetData) => {
        const resp = await api.post('/book-appointment', { ClientData, PetData })

        return resp.data
    },

    getAllFutureAppointments: async _ => {
        const resp = await api.get('/all-book')

        return resp.data
    },
    buyProducts: async Products => {
        const resp = await api.post('/buy-products', Products)
        return ({ msg: 'Sucesso' })
    }
}

export default backend