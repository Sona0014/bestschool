const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require('express-fileupload')

//image upload code
app.use(fileUpload({
  useTempFiles : true,
}));

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())



//static file
app.use(express.static('public'))

//ejs html css
app.set('view engine', 'ejs')

//message show
let session = require('express-session')
let flash = require('connect-flash');

app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

//Database Connection
const connectDB = require('./db/connectdb')
connectDB()

//data get
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//load route
app.use('/',web)








//create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})