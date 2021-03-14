import { Request, Response } from 'express'
import knex from '../database/connection'

interface File {
  location?: string
}

class DenunciationsController {
  async index(request: Request, response: Response, next: any) {
    try {
      const denunciations = await knex('denunciations')
      .distinct()
      .where({ resolved: false })
    
      return response.json(denunciations)
    } catch (error) {
      next(error)
    }
    
  }

  async show(request: Request, response: Response, next: any) {
    try {
      const { id } = request.params

      const denunciation = await knex('denunciations')
        .where({ id, resolved: false })
        .first()

      if (!denunciation) {
        return response.status(400).json({ message: 'Denúncia não encontrada.' })
      }

      return response.json(denunciation)
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: any) {
    try {
      const {
        latitude,
        longitude,
        description
      } = request.body
      
      const file = request.file as File

      const denunciation = {
        image_url: file.location,
        latitude,
        longitude,
        description
      }
    
      await knex('denunciations').insert(denunciation)
    
      return response.json(denunciation)
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: any) {
    try {
      const {
        image_url,
        latitude,
        longitude,
        description,
        resolved = false,
      } = request.body
      const { id } = request.params

      await knex('denunciations')
        .where({ id })
        .update({
          image_url,
          latitude,
          longitude,
          description,
          resolved,
        })

      return response.send()
    } catch (error) {
      next(error)
    }
  }
  async delete(request: Request, response: Response, next: any) {
    try {
      const { id } = request.params

      await knex('denunciations')
        .where({ id })
        .del()

      return response.send()
    } catch (error) {
      next(error)
    }
  }
}

export default DenunciationsController