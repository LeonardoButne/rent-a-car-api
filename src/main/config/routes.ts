import { Express } from 'express'
import userRoute from '../routers/users/user-router'
import transactionRoute from '../routers/transactions/transaction-router'

export default (app: Express): void => {
  app.use('/api/', userRoute)
  app.use('/api/', transactionRoute)
}
