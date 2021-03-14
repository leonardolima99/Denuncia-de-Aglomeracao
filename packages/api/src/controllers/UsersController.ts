import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class UsersController {
  async index(request: Request, response: Response, next: any) {
    try {
      const users = await knex('users')
      .distinct()
    
      return response.json(users)
    } catch (error) {
      next(error)
    }
  }

  async show(request: Request, response: Response, next: any) {
    try {
      const { username, password } = request.body

      if (!username) {
        return response.status(400).json({ error: 'O campo usuário é obrigatório.' })
      }

      if (!password) {
        return response.status(400).json({ error: 'O campo senha é obrigatório.' })
      }

      const user = await knex('users')
        .where({ username })
        .first()

      if (!user) {
        return response.status(401).json({ message: 'Usuário não existe.' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return response.status(401).json({ message: 'Senha incorreta.' })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '7d'
      })

      return response.json({ auth: true, token })
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: any) {
    try {
      const {
        username,
        password,
        level = 1
      } = request.body

      if (!username || !password) {
        return response.status(400).json({ error: 'O campo usuário é obrigatório.' })
      }

      if (!password) {
        return response.status(400).json({ error: 'O campo senha é obrigatório.' })
      }

      const userExist = await knex('users')
        .where({ username })
      
      console.log(userExist.length)
      if (userExist.length!=0) {
        return response.status(400).json({ error: 'Usuário já existe.' })
      }

      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password, salt)

      const user = {
        username,
        password: hash,
        level
      }

      const insertedId = await knex('users').insert(user)
      
      const token = jwt.sign({ id: insertedId[0] }, process.env.JWT_SECRET as string, {
        expiresIn: '7d'
      })

      return response.json({ auth: true, token })
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController