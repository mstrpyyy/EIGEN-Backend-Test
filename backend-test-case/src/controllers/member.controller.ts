import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getAllMembers = async (req: Request, res: Response) => {
    try {
        const memberList = await prisma.member.findMany({
            include: {
                _count: {
                    select: {
                        BorrowedList: {
                            where: {returned: false}
                        }
                    }
                }
            }
        })
        const totalMember = await prisma.member.count()
        res.status(200).send({
            status: 'ok',
            message: 'List of members found.',
            memberList,
            totalMember
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Internal server error.'
        })
    }
}

export const getMembers = async (req: Request, res: Response) => {
    try {
        const {code} = req.params
        const memberDetails = await prisma.member.findFirst({
            where: {code},
            include: {
                _count: {
                    select: {
                        BorrowedList: {
                            where: {returned: false}
                        }
                    }
                }
            }
        })
        if (!memberDetails) throw 'Member not found.'
        res.status(200).send({
            status: 'ok',
            message: 'Member found.',
            memberDetails
        }) 
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: 'Cannot find member.'
        })
    }
}


