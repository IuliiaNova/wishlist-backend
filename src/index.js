const app = require('./server')
const Config = require('./config/config')
const connectDB = require('./database/connect')

connectDB().then(async function onServerInit(){
  console.log('DB connected')

  app.listen(Config.app.PORT, () => {
    console.log('Server is running on port ' + Config.app.PORT)
  })
})