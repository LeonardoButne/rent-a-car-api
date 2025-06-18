import 'dotenv/config'
import { type Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST as string
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
})

// sequelizeConnection.sync({ alter: true })
sequelizeConnection.sync() // This will create new table if does not existed

export default sequelizeConnection
