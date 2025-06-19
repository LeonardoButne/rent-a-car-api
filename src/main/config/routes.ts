import { Express } from 'express'
import clientRoutes from '../routers/client-routes'

export default (app: Express): void => {
  app.use('/api/clients', clientRoutes)
}
