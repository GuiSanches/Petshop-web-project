import React from 'react'
import wxDL6es from '../../Images/Imagens uteis/wxDL6es.jpg'

export const TOKEN_KEY = "Petshop";

const commonData = {
    id: 0,
    logged: true,
    nome: 'Pedro',
    email: 'exemplo@exemplo.com',
    foto: wxDL6es,
    token: TOKEN_KEY,
    DataNascimento: '17/09/2000'
}

const defaultUserData = {
    isDefault: false,
    telefone: '9999999999',
    signo: 'leaozinho',
    ...commonData
}

const defaultAdminData = {
    DataNascimento: '17/09/2000',
    ...commonData
  }

export const UserCtx = React.createContext(defaultUserData)

export function UserContext(props) {
    const [userData, setUserData] = React.useState(defaultUserData)
    const [type, setType] = React.useState('admin')

    const setUserAdmin = userData => {
        setType('admin')
        setUserData(userData)
    }

    const setUserClient = userData => {
        setType('user')
        setUserData(userData)
    }

    const setUserByType = (type, data) => {
        if(type == 'user') setUserClient(data)
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