const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db')
const fs = require('fs')
const routes = fs.readdirSync('./routes')
const cookieParser = require('cookie-parser');



const app = express();
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === "development") {
    app.use(morgan('dev'))
}
connectDB()
app.use(express.json())
app.use(cors())
app.use(cookieParser());


routes.map(r => app.use('/api/v1', require('./routes/' + r)))

const server = app.listen(PORT, () => console.log(`Server is listing up in ${NODE_ENV} at port ${PORT}`.rainbow))
process.on('unhandledRejection', (err, promise) => {
    console.log("ERROR", err.message);
    server.close(process.exit(1))
})