'use strict'

const Antl = use('Antl')

class ForgotPassword {
    get validateAll() {
        return true
    }

    get messages () {
        return Antl.list('validation')
    }

    get rules () {
        return {
            email: 'required|email',
            redirect_url: 'required|url'
        }
    }
}

module.exports = ForgotPassword
