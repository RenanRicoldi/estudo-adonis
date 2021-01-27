'use strict'

const Antl = use('Antl')

class ResetPassword {
    get validateAll() {
        return true
    }

    get messages () {
        return Antl.list('validation')
    }

    get rules () {
        return {
            token: 'required',
            password: 'required|confirmed'
        }
    }
}

module.exports = ResetPassword
