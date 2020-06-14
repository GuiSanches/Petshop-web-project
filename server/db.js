const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
let client;
let db;
const Crypto = require('./Crypto');

const initialize = async _ => {
    const uri = "mongodb+srv://petshop:admim@cluster0-il6hs.mongodb.net/petshop?retryWrites=true&w=majority";

    client = await MongoClient.connect(uri, { useUnifiedTopology: true });

    db = client.db('petshop')
}

const destroy = async _ => {
    client.close();
}

const signIn = async (email, password) => {
    const user = await db.collection('users').findOne({ Email: email })

    if (Crypto.Compare(password, user.Senha))
        return user
    else throw new Error('Invalid password')
}

const signUpClient = async (userData) => {
    const pass = await Crypto.Encrypt(userData.Senha)
    userData.Senha = pass
    return db.collection('users').insertOne(userData)
}

const signUpAdmin = async (adminData) => {
    const pass = await Crypto.Encrypt(adminData.Senha)
    adminData.Senha = pass
    return db.collection('veterinarios').insertOne(adminData)
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

const getProductsHighlights = async _ => {
    try {
        const ofertas = await db.collection('ofertas').find({}).toArray()

        return Promise.all(
            ofertas.map(async e => ({
                ...e,
                Produtos: await Promise.all(
                    e.Produtos.map(async P =>
                        db.collection('produtos').findOne({ _id: new ObjectID(P) })
                    ))
            }))
        )
    } catch (e) {
        return e
    }
}

const getPromotions = async _ => {
    return db.collection('destaques').find({}).toArray()
}

const getAllFutureBook = async _ => {
    return db.collection('consultas').find({
        Data: {
            $gte: new Date()
        }
    }).toArray()
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
    signUpClient,
    signUpAdmin,
    getCartById,
    getProducts,
    getProductsHighlights,
    bookAppointment,
    getPromotions,
    getAllFutureBook,
    destroy
}


/*
Usuário: Nome, email, senha, telefone, CPF, animais
animais: Nome, idade, especie, situação_animal
situação animal: registro_pet[]
consultas: dia, animal, dono, vet
*/