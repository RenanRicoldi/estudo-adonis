'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

// Rotas não autenticadas
// Validator valida os dados de entrada conforme as regras do validator
Route.post('users', 'UserController.store').validator('User')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

// Rotas autenticadas
// API Only para não pegar as rotas de formulário
// Map com array dizendo quais métodos vão ser validados e quais validators serão utilizados para isso
Route.group(() => {
    Route.post('files', 'FileController.store')

    Route.resource('projects', 'ProjectController').apiOnly().validator(new Map([[['projects.store'], ['Project']]]))
    Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map([[['projects.tasks.store'], ['Task']]]))

}).middleware('auth')
