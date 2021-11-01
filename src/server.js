const app = require('./app')
require('./config/conn')

var PORT = process.env.PORT || 8080

app.listen(PORT, (_) => console.log(`App runing on port ${PORT}`))
