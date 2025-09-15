import express from "express"
import { feed } from "./controllers/getFeed";

const feedRouter = express.Router();

feedRouter.get("/feed", feed);