import { type Express } from 'express'
import { bodyParser, helmetApp, morganApp } from '../middlewares'
import { corsApp } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(corsApp)
  app.use(helmetApp)
  app.use(morganApp)
}
