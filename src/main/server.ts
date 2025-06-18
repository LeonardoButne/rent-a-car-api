import app from './config/app'

const PORT = process.env.PORT || 4002

app.listen(PORT, () => {
  console.log(`Server run at http://localhost:${PORT}`)
  console.log(`Swagger is run at http://localhost:${PORT}/api-docs`)
})
