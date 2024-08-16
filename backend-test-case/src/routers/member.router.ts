import { Router } from "express";
import { getAllMembers, getMembers } from "../controllers/member.controller";


const memberRouter = Router()
/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     description: Retrieves a list of all members with their details.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: Successfully retrieved list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: List of members found.
 *                 memberList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: M001
 *                       name:
 *                         type: string
 *                         example: Angga
 *                       penaltyExpireDate:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       _count:
 *                         type: object
 *                         properties:
 *                           BorrowedList:
 *                             type: integer
 *                             example: 0
 *                 totalMember:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
memberRouter.get('/', getAllMembers)
/**
 * @swagger
 * /members/{code}:
 *   get:
 *     summary: Get member details
 *     description: Retrieves details of a specific member by their code.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           example: M001
 *     responses:
 *       200:
 *         description: Successfully retrieved member details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Member found.
 *                 memberDetails:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: M001
 *                     name:
 *                       type: string
 *                       example: Angga
 *                     penaltyExpireDate:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     _count:
 *                       type: object
 *                       properties:
 *                         BorrowedList:
 *                           type: integer
 *                           example: 0
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Cannot find member.
 */
memberRouter.get('/:code', getMembers)

export default (memberRouter)