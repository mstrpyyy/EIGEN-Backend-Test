import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verifyBook, handleBorrow, handleReturn } from "../services/book.action";
import { createPenalty, verifyMember, memberBorrowList } from "../services/member.action";


const prisma = new PrismaClient()

export const GetAllBooks = async (req: Request, res: Response) => {
    try {
        const bookList = await prisma.book.findMany({
            orderBy:{stock: 'desc'}
        })
        const bookStats = await prisma.book.aggregate({
            _count: {title:true},
            _sum: {stock:true}
        })
        res.status(200).send({
            status: 'ok',
            message: 'List of books found.',
            bookList,
            totalTitle: bookStats._count.title,
            totalStock: bookStats._sum.stock 
        }) 
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Internal server error.'
        })
    }
}

export const borrowBooks = async (req: Request, res: Response) => {
    try {
        const {memberCode, bookCode} = req.body

        const member = await verifyMember(memberCode)
        const date = new Date()
        if (member.penaltyExpireDate && member.penaltyExpireDate > date) throw `Member is banned from borrowing books until ${member.penaltyExpireDate}.`
        
        const borrowedList = await memberBorrowList(memberCode)
        if (borrowedList.length >= 2) throw 'Member has reached maximum book quantity.'
        
        const book = await verifyBook(bookCode)
        if (book && book.stock === 0) throw 'Book is out of stock.'
        
        const newBorrowedList = await handleBorrow(member.code, book.code)
        
        res.status(201).send({
            status: 'ok',
            message: 'New borrowed list created',
            newBorrowedList
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: typeof(error == 'string') ? error : 'Failed to create new borrowed list.'
        })
    }
}

export const returnBooks = async (req: Request, res: Response) => {
    try {
        const {memberCode, bookCode} = req.body
        const member = await verifyMember(memberCode)
        const book = await verifyBook(bookCode)
        const returnedBook = await handleReturn(member.code, book.code) 
        
        let penalty = false
        const currentDate = new Date()
        const returnLimit = new Date(returnedBook.borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        if (returnLimit < currentDate) {
            await createPenalty(member.code)
            penalty = true
        }

        res.status(200).send({
            status: 'ok',
            message: `Book returned${penalty ? ' with penalty.' : '.'}`
        })
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: typeof(error == 'string') ? error : 'Failed to return books.'
        })
    }
}

