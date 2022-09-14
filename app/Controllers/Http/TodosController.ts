import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ view }: HttpContextContract) {
    const data = await Todo.all()

    // if (!params.sort) {
      // data.sort((a, b) => 0 - (a.isCompleted > b.isCompleted ? -1 : 1));
    // } else {
      data.sort((a, b) => 0 - (!a.isCompleted > !b.isCompleted ? -1 : 1));
      data.reverse()
    // }

    return view.render('todo/index', { data })
  }

  // public async sort({ view }: HttpContextContract) {
  //   const data = await Todo.all()

  //   // if (!params.sort) {
  //     // data.sort((a, b) => 0 - (a.isCompleted > b.isCompleted ? -1 : 1));
  //   // } else {
  //     data.sort((a, b) => 0 - (!a.isCompleted > !b.isCompleted ? -1 : 1));
  //     data.reverse()
  //   // }

  //   return view.render('todo/index', { data })
  // }

  public async completed({ view }: HttpContextContract) {
    const data = await Todo.query().where('isCompleted', '=', true)

    return view.render('todo/index', { data })
  }

  public async onHold({ view }: HttpContextContract) {
    const data = await Todo.query().where('isCompleted', '=', false)
    return view.render('todo/index', { data })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(255)])
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

  public async update({ request, response, session, params }: HttpContextContract) {
    const data = await Todo.findOrFail(params.id)

    data.isCompleted = !!request.input('completed')

    await data.save()

    session.flash('notification', 'Todo Updated!')

    return response.redirect().back()
  }

  public async editShow({ view, params }: HttpContextContract) {
    const data = await Todo.findOrFail(params.id)

    return view.render('todo/edit', { data })
  }

  public async updateTitle({ response, request, session, params }: HttpContextContract) {
    const data = await Todo.findOrFail(params.id)
    // data.title = request.input('title')
    // data.isCompleted = !!request.input('completed')

    const { title, completed } = request.only(['title', 'completed'])
    data.title = title
    data.isCompleted = !!completed
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(10)])
    })

    await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Silakan isi dulu mas...',
        'title.maxLength': 'kepanjangan kuys...'
      }
    })

    await data.save()
    // await data.save({schema: validateData})

    session.flash('notification', 'todo Updated!')

    // return response.redirect().toRoute('todo.index')
    return response.redirect('/todo')
  }



  public async destroy({ response, session, params }: HttpContextContract) {
    const data = await Todo.findOrFail(params.id)
    await data.delete()
    session.flash('notification', 'todo has been remove')
    return response.redirect().back()
  }
}
