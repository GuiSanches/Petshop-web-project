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
        console.log(`server running on port ${PORT}`)
    })

    app.get('/', (req, res, next) => {

        res.send({ PetGui: 'Sucesso, bem vindo a melhor petshop do BRASIL!' })
    })

    app.get('/login', async (req, res, next) => {
        const { email, password } = req.body;
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

            await db.signUp({
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
        }catch(e) {
            console.log(e)
        }
    })
}

server()