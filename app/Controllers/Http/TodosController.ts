import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import session from 'Config/session'

export default class TodosController {
    public async index({view}:HttpContextContract){
        return view.render('todo/index')
    }

    public async store({request, response}:HttpContextContract){
        await Todo.create({
            title: request.input('title')
        })

        

        return response.redirect().back()
    }
}
