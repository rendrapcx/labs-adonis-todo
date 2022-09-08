import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Todo from 'App/Models/Todo'

export default class TodosController {
    public async index({view}:HttpContextContract){
        const todos = await Todo.all() 
        return view.render('todo/index', {todos})
    }

    public async store({request, response, session}:HttpContextContract){
        const validationSchema = schema.create({
            title: schema.string({trim:true},[rules.maxLength(255)])
        })

        const validateData = await request.validate({
            schema: validationSchema,
            messages: {
                'title.required': 'Silakan isi dulu mas...',
                'title.maxLength': 'kepanjangan kuys...'
            }
        })

        await Todo.create({
            title: validateData.title
        })

        session.flash('notification', 'todo created!')

        return response.redirect().back()
    }

    public async update({request, response, session, params}:HttpContextContract){
        const todo = await Todo.findOrFail(params.id)

        todo.isCompleted = !!request.input('completed')
        await todo.save()
        session.flash('notification', 'Todo Updated!')
        return response.redirect().back()
    }

    public async destroy({ response, session, params}:HttpContextContract){
        const todo = await Todo.findOrFail(params.id)
        await todo.delete()
        session.flash('notification', 'todo has been remove')
        return response.redirect().back()
    }
}
