const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
let client;
let db;

const initialize = async _ => {
    const uri = "mongodb+srv://petshop:admim@cluster0-il6hs.mongodb.net/petshop?retryWrites=true&w=majority";

    client = await MongoClient.connect(uri, { useUnifiedTopology: true });

    db = client.db('petshop')
    db.collection('produtos').find({ _id: 'dsa' })
}

const destroy = async _ => {
    client.close();
}

const signIn = async (email, password) => {
    return db.collection('users').findOne({ Email: email, Senha: password })
}

const signUp = async (userData) => {
    return db.collection('users').insertOne(userData)
}

const getShopBoughtById = async id => db.collection('compras').find(
    { Cliente: new ObjectID(id) })
    .toArray()

const getProductsById = async id => db.collection('produtos').find({
    _id: {
        "$in": id
    }
}).toArray()

const getCartById = async (userID) => {
    const HistoryCart = await getShopBoughtById(userID)

    const productsId = HistoryCart.map(e => e.Produto)

    const productsBought = await getProductsById(productsId)

    return productsBought.map(p => {
        const shopping = HistoryCart
            .filter(H => JSON.stringify(H.Produto) === JSON.stringify(p._id))
            .map(s => ({ Qtd: s.Quantidade, Price: s.PrecoUnitario, Date: s.Date, key: s._id }))

        return ({
            ...p,
            history: shopping
        })
    })
}

const getProducts = async _ => {
    return db.collection('produtos').find({}).toArray()
}

const getAllFutureBook = async _ => {
    try {
        let resp = await db.collection('consultas').find({
            Data: {
                $gte: new Date()
            }
        }).toArray()
        return resp
    } catch (e) {
        return e
    }
}

const bookAppointment = async ({ ClientData, PetData }) => {
    return db.collection('consultas').insertOne({
        Cliente: new ObjectID(ClientData.id),
        Veterinario: new ObjectID('5ed960d4caaf62cc4627eb7c'),
        Animal: PetData.petName,
        Data: new Date(ClientData.Date),
        Descricao: PetData.reason
    })
}

module.exports = {
    initialize,
    signIn,
    signUp,
    getCartById,
    getProducts,
    bookAppointment,
    getAllFutureBook,
    destroy
}


/*
Usuário: Nome, email, senha, telefone, CPF, animais
animais: Nome, idade, especie, situação_animal
situação animal: registro_pet[]
consultas: dia, animal, dono, vet
*/