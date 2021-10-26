const app = require('./app')

var PORT = process.env.PORT || 8080

app.listen(PORT, (_) => console.log(`App runing on port ${PORT}`))
