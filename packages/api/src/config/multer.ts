import express, { Request } from 'express'
import path from 'path'
import { v4 as uuid } from 'uuid'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import multer from 'multer'

require('dotenv').config({path: '.env'})

interface File {
  location?: string
  originalname: string
}

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
})

const s3 = new aws.S3()

export default {
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET as string,
    acl: process.env.ACL,
    key(req: Request, file: File, callback: any) {
      callback(null, uuid() + path.extname(file.originalname))
    }
  })
}

/* export default {
  dest: './uploads',
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      callback(null, uuid() + path.extname(file.originalname))
    }
  })
} */
