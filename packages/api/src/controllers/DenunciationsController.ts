import { Request, Response } from 'express'
import knex from '../database/connection'

interface File {
  location?: string
}

interface Files {
  [index: number]: File
}

class DenunciationsController {
  async index(request: Request, response: Response, next: any) {
    try {
      let date_yesterday = new Date(Date.now() - 86400000)
      let date_now = new Date(Date.now())

      const denunciations = await knex('denunciations')
        .distinct()
        .where({ resolved: false })
        /* .where('created_at', '>=', String(date_yesterday)) */
        .whereBetween('created_at', [date_yesterday, date_now])
    
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
        /* user_id, */
        latitude,
        longitude,
        description,
      } = request.body
      console.log(request.files)
      const file = request.files as Files

      console.log({
        /* user_id, */
        latitude,
        longitude,
        description,
        image_url: file[0].location,
      })

      const denunciation = {
        image_url: file[0].location,
        //image_url: request.file.destination + '/' + request.file.originalname,
        latitude,
        longitude,
        description,
        created_at: new Date(),
        updated_at: new Date(),
      }
    
      await knex('denunciations').insert(denunciation)
      console.log(denunciation)
      return response.json(denunciation)
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: any) {
    try {
      const {
        image_url,
        longitude,
        latitude,
        description,
        resolved = false,
      } = request.body
      const { id } = request.params

      await knex('denunciations')
        .where({ id })
        .update({
          image_url,
          latitude: String(latitude),
          longitude: String(longitude),
          description,
          resolved,
          updated_at: new Date(),
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