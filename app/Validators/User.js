'use strict'

const Antl = use('Antl')

class User {
    // permite que todos os campos sejam validados, independente do encontro de erros
    get validateAll() {
        return true
    }

    // Retorna mensagens entendíveis para o público em inglês
    get messages () {
        return Antl.list('validation')
    }

    get rules () {
        return {
            username: 'required|unique:users',
            email: 'required|email|unique:users',
            password: 'required|confirmed',
        }
    }
}

module.exports = User
