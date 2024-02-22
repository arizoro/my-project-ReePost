import express from "express";
import { publicRouter } from "../routers/public-api.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { userApi } from "../routers/api.js";
import cors from 'cors'

const web = express()
web.use(express.json())
web.use(cors())


web.use(publicRouter)
web.use(userApi)

web.use(errorMiddleware)

web.listen(3000, () => {
    console.log('Server Running in port 3000')
})