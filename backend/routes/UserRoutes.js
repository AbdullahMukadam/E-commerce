import express from "express"
import { CreateUser , LoginUser, LogoutUser} from "../controllers/UserController.js"
const Router = express.Router()

Router.route("/").post(CreateUser)
Router.post("/auth", LoginUser)
Router.post("/logout", LogoutUser)


export default Router;