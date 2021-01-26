'use strict'

const moment = require('moment')
const crypto = require('crypto')

const Mail = use('Mail')
const User = use('App/Models/User')

class ForgotPasswordController {
    async store({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            user.token = crypto.randomBytes(10).toString('hex')
            user.token_created_at = new Date()

            await user.save()

            await Mail.send(
                ['emails.forgot_password'],
                {
                    email,
                    token: user.token,
                    link: `${request.input('redirect_url')}?token=${user.token}`
                },
                message => {
                    message
                        .to(email)
                        .from('renan.ricoldi@luby.software', 'Renan | Luby')
                        .subject('Recuperação de senha')
                }
            )
        } catch(error) {
            return response
                .status(error.status)
                .send({ error: { message: 'Este e-mail não existe.' } })
        }
    }

    async update({ request, response }) {
        try {
            const { token, password } = request.all()
            const user = await User.findByOrFail('token', token)

            const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

            if(tokenExpired) {
                return response
                    .status(401)
                    .send({ error: { message: 'O token expirou.' } })
            }

            user.password = password
            user.token = null
            user.token_created_at = null

            await user.save()

        } catch(error) {
            return response
                .status(error.status)
                .send({ error: { message: 'Algo deu errado ao resetar sua senha.' } })
        }
    }

}

module.exports = ForgotPasswordController
