import app from './config/app'

const PORT = Number(process.env.PORT) || 4002

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Swagger is running at http://localhost:${PORT}/api-docs`)
})
