import { Router } from "express";
import { getAllMembers, getMembers } from "../controllers/member.controller";


const memberRouter = Router()

memberRouter.get('/', getAllMembers)
memberRouter.get('/:code', getMembers)

export default (memberRouter)