const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db');

const server = async () => {
    const app = express()
    const PORT = 8080

    app.use((req, res, next) => { // tirar cors
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
        );
        if (req.method === 'OPTIONS') {
            res.send();
        } else {
            next();
        }
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.listen(PORT, () => {
        db.initialize()
        console.log(`server running on port ${PORT}`)
    })

    app.get('/', (req, res, next) => {

        res.send({ PetGui: 'Sucesso, bem vindo à melhor petshop do BRASIL!' })
    })

    app.get('/login', async (req, res, next) => {
        const { email, password } = req.query;
        try {
            await db.initialize()
            let user = await db.signIn(email, password)
            let msg = user == null ? { erro: 'Usuário não encontrado' } : user
            console.log(user)
            await db.destroy()
            res.send(msg)
        } catch (e) {
            console.log(e)
            res.status(404).send(e.message)
        }
    })

    app.post('/create-user', async (req, res, next) => {
        const { name, email, CPF, date, phone, pass } = req.body

        try {
            await db.initialize()

            await db.signUpClient({
                Nome: name,
                Email: email,
                Nascimento: new Date(date),
                Foto: 'marcos.jpg',
                Senha: pass,
                Telefone: phone,
                CPF,
                Animais: []
            })

            res.send('Usuário adicionado com sucesso')

            await db.destroy()
        } catch (e) {
            console.log(e)
            res.status(404).send(e.message)
        }
    })

    app.post('/create-admin', async (req, res, next) => {
        const { name, email, pass } = req.body
        try {
            await db.initialize()

            const resp = await db.signUpAdmin({
                Nome: name,
                Email: email,
                Senha: pass
            })
            await db.destroy()
            res.send('Veterinário adicionado com sucesso')

        } catch (e) {
            res.status(404)
            console.log(e)
        }
    })

    app.get('/products-cart/:id', async (req, res, next) => {
        try {
            await db.initialize()
            let resp = await db.getCartById(req.params.id)

            res.send(resp)
            await db.destroy()
        } catch (e) {
            console.log(e)
        }
    })

    app.get('/products', async (req, res, next) => {
        try {
            console.log('oi')
            await db.initialize()

            let resp = await db.getProducts()
            console.log(resp)

            await db.destroy()
            res.send(resp)

        } catch (e) {
            console.log(e)
        }
    })

    app.get('/services', async (req, res, next) => {
        try {
            console.log('oi')
            await db.initialize()

            let resp = await db.getServices()
            console.log(resp)

            await db.destroy()
            res.send(resp)

        } catch (e) {
            console.log(e)
        }
    })

    app.post('/add-product', async (req, res, next) => {
        try {
            const {data} = req.body
            await db.initialize()
            const resp = await db.AddProduct(data)
            await db.destroy()
            res.send(data)
        }catch(e) {
            console.log(e)
        }
    })

    app.post('/add-service', async (req, res, next) => {
        try {
            const {data} = req.body
            await db.initialize()
            const resp = await db.AddService(data)
            await db.destroy()
            res.send(data)
        }catch(e) {
            console.log(e)
        }
    })

    app.post('/products/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            const { Product } = req.body
            await db.initialize()
            let resp = await db.updateProduct(id, Product)
            await db.destroy()
            res.send(resp)
        } catch (e) {
            console.log(e)
        }
    })

    app.post('/services/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            const { Product } = req.body
            await db.initialize()
            let resp = await db.updateService(id, Product)
            await db.destroy()
            res.send(resp)
        } catch (e) {
            console.log(e)
        }
    })

    app.post('/delete-product/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            await db.initialize()
            const resp = await db.deleteProduct(id)
            console.log(resp)
            await db.destroy()
            res.send(resp)
        }catch(e) {
            console.log(e)
        }
    })

    app.post('/delete-service/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            console.log(id)
            await db.initialize()
            const resp = await db.deleteService(id)
            console.log(resp)
            await db.destroy()
            res.send(resp)
        }catch(e) {
            console.log(e)
        }
    })

    app.get('/products-highlights', async (req, res, next) => {
        try {
            await db.initialize()
            let resp = await db.getProductsHighlights()
            await db.destroy()
            res.send(resp)
        } catch (e) {
            console.log(e)
        }
    })

    app.get('/promotions', async (req, res, next) => {
        try {
            await db.initialize()
            let resp = await db.getPromotions()
            res.send(resp)
        } catch (e) {
            console.log(e)
        }
    })

    app.get('/appointment-info/:id', async (req, res, next) => {
        try {
            const id = req.params.id
            await db.initialize()
            let resp = await db.getAppointmentInfo(id)
            console.log(resp[0])
            await db.destroy()
            res.send(resp[0])
        }catch(e) {
            console.log(e)
        }
    })

    app.post('/book-appointment', async (req, res, next) => {
        const data = req.body

        try {
            await db.initialize()
            let resp = await db.bookAppointment(data)
            console.log(resp)
            await db.destroy()
            res.send(resp)

        } catch (e) {
            console.log(e)
        }
    })

    app.get('/all-book', async (req, res, next) => {
        try {
            await db.initialize()
            const resp = await db.getAllFutureBook()
            console.log(resp)
            await db.destroy()
            res.send(resp)
        } catch (e) {
            console.log(e)
        }
    })

    app.post('/buy-products', async (req, res, next) => {
        const data = req.body
        try {
            await db.initialize()
            const resp = await db.AddPurchase(data)
            await db.destroy()
            res.send(resp)
        } catch (e) {
            console.log(e)
            res.status(404)
        }
    })
}

server()