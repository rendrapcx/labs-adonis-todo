/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(()=>{
  Route.get('/', 'TodosController.index').as('todo.index')
  Route.post('/', 'TodosController.store').as('todo.store')
  Route.patch('/:id', 'TodosController.update').as('todo.update')
  // Route.put('/:id', 'TodosController.update').as('todo.update')
  Route.delete('/:id', 'TodosController.destroy').as('todo.destroy')
}).prefix('/todo')