import express, { Request, Response } from 'express'
import { celebrate, Joi } from 'celebrate'
import jwt from 'jsonwebtoken'

import multer from 'multer'
import multerConfig from './config/multer'

import DenunciationsController from './controllers/DenunciationsController'
import UsersController from './controllers/UsersController'

const routes = express.Router() 
const upload = multer(multerConfig)

const denunciationsController = new DenunciationsController()
const usersController = new UsersController()

const authenticateToken = async (request: Request, response: Response, next: any) => {
  const token = request.headers['x-access-token'] as string

  if (!token) return response.status(401)

  jwt.verify(token, process.env.JWT_SECRET as string, (error: any, user: any) => {
    if (error) {
      return response.status(401).json({ error: 'Token inválido.' })
    }
    console.log(user)
    next()
  })
}

routes.get('/users', usersController.index)
routes.get('/login', usersController.show)
routes.post('/users', usersController.create)
routes.get('/logout', (request: Request, response: Response) => {
  return response.json({ auth: false, token: null })
})

routes.get('/denunciations', denunciationsController.index)
routes.get('/denunciations/:id', denunciationsController.show)

routes.post(
  '/denunciations', 
  upload.single('file'), 
  celebrate({
    body: Joi.object().keys({
      description: Joi.string(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    })
  }, {
    abortEarly: false
  }),
  denunciationsController.create
)

routes.put('/denunciations/:id', authenticateToken, denunciationsController.update)
routes.delete('/denunciations/:id', denunciationsController.delete)

routes.all('/*', (request: Request, response: Response) => {
  response.json({ error: 'Recurso não existe.' })
})

export default routes
