import { Router } from "express";
import { borrowBooks, GetAllBooks, returnBooks } from "../controllers/book.controller";


const bookRouter = Router()


bookRouter.get('/', GetAllBooks)
bookRouter.post('/borrow', borrowBooks)
bookRouter.patch('/return', returnBooks)


export default (bookRouter)