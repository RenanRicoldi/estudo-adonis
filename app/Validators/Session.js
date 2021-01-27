'use strict'

const Antl = use('Antl')

class Session {
    get validateAll() {
        return true
    }

    get messages () {
        return Antl.list('validation')
    }


    get rules () {
        return {
            email: 'required|email',
            password: 'required'
        }
    }
}

module.exports = Session
