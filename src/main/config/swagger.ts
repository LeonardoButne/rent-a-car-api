import { serve, setup } from 'swagger-ui-express'
import { type Express } from 'express'

import swaggerConfig from '../docs'

export default (app: Express) => {
  app.use('/api-docs', serve, setup(swaggerConfig))
}
