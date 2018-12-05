const app = require('./index')
const db = require('./db')

//starts server and syncs database

const startEverything = async () => {
  try {
    await db.sync()
    const port = process.env.PORT || 8000
    app.listen(port, error => {
      if (error) { console.error(error) }
      else { console.log(`server running on port: ${port}`) }
    })
  } catch (error) {
    console.error(error)
  }
}

startEverything()


