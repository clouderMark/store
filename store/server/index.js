import config from 'dotenv/config';
import express from 'express';
import sequelize from './sequelize.js';
import * as mapping from './models/mapping.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandler.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 2900

const app = express()
app.use(cors({origin: ['http://localhost:3000'], credentials: true}))
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload())
app.use(cookieParser(process.env.SECRET_KEY))
app.use('/api', router)

//Обработка ошибок
app.use(ErrorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен', PORT))
    } catch (e) {
        console.log(e)
    }
}

start()

 