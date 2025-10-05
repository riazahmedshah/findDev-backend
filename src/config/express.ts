import express from "express"
import { routes } from "../routes/index.ts";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api', routes)

export{app};