import { Express } from 'express'
import clientRoutes from '../routers/client-routes'
import ownerRoutes from '../routers/owner-routes'
import administratorRoutes from '../routers/administrator-routes'
import carRoutes from '../routers/car-routes'

export default (app: Express): void => {
  app.use('/api/client', clientRoutes)
  app.use('/api/owner', ownerRoutes)
  app.use('/api/administrator', administratorRoutes)
  app.use('/api/car', carRoutes)
}
