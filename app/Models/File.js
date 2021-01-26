'use strict'

const Env = use('Env')
const Model = use('Model')

class File extends Model {
    static get computed() {
        return ['url']
    }

    getUrl({ id }) {
        return `${Env.get('APP_URL')}/files/${id}`
    }
}

module.exports = File
