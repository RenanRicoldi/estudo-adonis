'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    static boot() {
        super.boot()

        // Envia um email toda vez depois da criação de uma task e antes de salvar a atualização dela
        this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
        this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
    }

    project() {
        return this.belongsTo('App/Models/Project')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    file() {
        return this.belongsTo('App/Models/File')
    }
}

module.exports = Task
