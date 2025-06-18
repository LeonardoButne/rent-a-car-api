import express from 'express'
import setupMiddlewares from './middleware'
import setupRouter from './routes'
import setupSwagger from './swagger'


const app = express()
setupMiddlewares(app)
setupRouter(app)
setupSwagger(app)

export default app
