'use strict'

const Antl = use('Antl')

class Project {
    get validateAll() {
        return true
    }

    get messages () {
        return Antl.list('validation')
    }

    get rules () {
        return {
            title: 'required',
            description: 'required'
        }
    }
}

module.exports = Project
