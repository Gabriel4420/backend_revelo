const mongoose = require('mongoose')

class Connection {
  constructor() {
    this.DbConnectionMongoDB()
  }

  DbConnectionMongoDB() {
    this.mongoDBConnection = mongoose
      .connect('mongodb+srv://gabriel:442018@cluster0.hfg3u.mongodb.net/nodejs?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connection established successfully with MongoDB ')
      })
      .catch((error) => {
        console.log(`Error while establishing a connection >> ${error} `)
      })
  }


}

module.exports = new Connection()
