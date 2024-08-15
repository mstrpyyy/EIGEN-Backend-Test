import { Request, Response, Router,  } from 'express'


const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        status: "ok",
        message: "welcome to Arya's API"
    })
})


export default router