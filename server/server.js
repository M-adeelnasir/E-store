const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');


const app = express();
const PORT = process.env.PORT || 5000

const ENVIORMENT = process.env.ENVIORMENT
if (ENVIORMENT === "production") {
    app.use(morgan('dev'))
}
app.use(cors())

const server = app.listen(PORT, () => console.log(`Server is listing up in ${ENVIORMENT} at port ${PORT}`.rainbow))