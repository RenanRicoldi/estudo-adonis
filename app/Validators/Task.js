'use strict'

const Antl = use('Antl')

class Task {
    get validateAll() {
        return true
    }

    get messages () {
        return Antl.list('validation')
    }

    get rules () {
        return {
            title: 'required',
            due_date: 'date'
        }
    }
}

module.exports = Task
