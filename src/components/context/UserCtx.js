import React from 'react'
export const TOKEN_KEY = "Petshop";

const commonData = {
    id: 0,
    logged: true,
    Nome: 'Pedro',
    Email: 'exemplo@exemplo.com',
    Foto: 'marcos.jpg',
    token: TOKEN_KEY,
    Nascimento: '17/09/2000'
}

const defaultUserData = {
    isDefault: false,
    Telefone: '9999999999',
    signo: 'leaozinho',
    Animais: [],
    ...commonData
}

const defaultAdminData = {
    DataNascimento: '17/09/2000',
    ...commonData
}

export const UserCtx = React.createContext(defaultUserData)
const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

export function UserContext(props) {
    const [userData, setUserData] = React.useState(defaultUserData)
    const [load, setLoaded] = React.useState(false)
    const [type, setType] = React.useState('admin')

    React.useEffect(_ => {
        let user = JSON.parse(localStorage.getItem(TOKEN_KEY))
        if (!load && user) {
            user = user.user
            setUserData(user)
            setLoaded(true)
        }        
    }, [load])

    const setUserAdmin = userData => {
        setType('admin')
        setUserData(userData)
    }

    const setUserClient = userData => {
        setType('user')
        setUserData(userData)
    }

    const setUserByType = (type, data) => {
        if (type === 'user') setUserClient(data)
        else setUserAdmin(data)
    }
    return (
        <UserCtx.Provider value={{
            type,
            userData,
            setUserByType
        }}>
            {props.children}
        </UserCtx.Provider>
    )
}