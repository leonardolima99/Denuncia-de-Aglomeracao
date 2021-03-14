import express, { Request, Response} from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'

require('dotenv').config({path: '.env'})

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

interface ErrorReq {
  status?: number
  message?: string
}

// Not found
app.use((req: Request, res: Response, next:any) => {
  const error = new Error('Not found.') as ErrorReq
  error.status = 404
  next(error)
})

// catch all
app.use((error: ErrorReq, req: Request, res: Response, next: any) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
  next()
})

app.listen(process.env.PORT || 3333, () => console.log('Ok'))
