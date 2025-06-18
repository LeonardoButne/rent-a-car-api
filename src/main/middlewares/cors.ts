import cors from 'cors'

const allowList = ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000']

const corsOptions = {
  origin: function (origin, callback) {
    if (allowList.includes(`${origin}`) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Não foi permitido pelo CORS'))
    }
  },
}

export const corsApp = cors(corsOptions)
