import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import dotenv from 'dotenv'
dotenv.config({path: path.join(__dirname,'./config/.env')})
import express from 'express'
import * as indexRouter from './src/module/index.router.js'
import connectDB from './DB/connection.js';
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import flash from 'connect-flash'
const mongoSession = MongoDBStore(session)
const app = express()
const port = 3000
const baseUrl = process.env.BASEURL
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, './src/views/utils/css')))
app.use(express.static(path.join(__dirname, './src/views/utils/js')))
app.use(express.json())
var store = new mongoSession({
    uri : process.env.DBURI,
    collection: 'mySessions'
})
app.use(session({
    secret: 'SecRet SessIon',
    resave: false,
    saveUninitialized: true,
    store,
    // cookie: { secure: true }
  }))
app.use(flash())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/views'))
app.use(`/auth`, indexRouter.authRouter)
app.use(`/user`, indexRouter.userRouter)
app.use(`/note`, indexRouter.noteRouter)


connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))