const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
let client;
let db;

// const db = async _ => {

//     const MongoClient = require('mongodb').MongoClient;

//     const uri = "mongodb+srv://petshop:admim@cluster0-il6hs.mongodb.net/petshop?retryWrites=true&w=majority";

//     const client = new MongoClient(uri, { useUnifiedTopology: true });

//     client.connect(err => {
//         const collection = client.db("petshop").collection("users");
//         // perform actions on the collection object
//         assert.equal(null, err);
//         console.log("Connected successfully to server", collection);
//         client.close();
//     });
// }

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

module.exports = {
    initialize,
    signIn,
    signUp,
    getCartById,
    destroy
}


/*
Usuário: Nome, email, senha, telefone, CPF, animais
animais: Nome, idade, especie, situação_animal
situação animal: registro_pet[]
consultas: dia, animal, dono, vet
*/