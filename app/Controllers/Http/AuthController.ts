import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

    public async showRegister({ view }: HttpContextContract) {
        return view.render('auth/register')
    }

    public async showLogin({ view }: HttpContextContract) {
        return view.render('auth/login')
    }
}
