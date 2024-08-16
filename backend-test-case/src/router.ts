import { Request, Response, Router,  } from 'express'
import bookRouter from './routers/book.router'
import memberRouter from './routers/member.router'

const router = Router()

router.use('/books', bookRouter)
router.use('/members', memberRouter)


export default router