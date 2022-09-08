import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Todo from 'App/Models/Todo'

export default class TodosController {
    public async index({view}:HttpContextContract){
        return view.render('todo/index')
    }

    public async store({request, response}:HttpContextContract){
        const validationSchema = schema.create({
            title: schema.string({trim:true},[rules.maxLength(10)])
        })

        const validateData = await request.validate({
            schema: validationSchema,
            messages: {
                'title.required': 'title required',
                'title.maxLength': 'kepanjangan kuys'
            }
        })

        await Todo.create({
            title: validateData.title
        })

        

        return response.redirect().back()
    }
}
