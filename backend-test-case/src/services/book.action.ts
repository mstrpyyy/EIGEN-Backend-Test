import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function verifyBook(bookCode: string) {
    const selectedBook = await prisma.book.findFirst({
        where: {
            code: bookCode
        }
    })
    if (!selectedBook) throw 'Book not found.'
    
    return selectedBook
} 

export async function handleBorrow(memberCode: string, bookCode: string) {
    const newBorrowedList = await prisma.borrowedList.create({
        data: {
            memberCode,
            bookCode
        }
    })
    await prisma.book.update({
        where: { 
            code:bookCode 
        },
        data: {
            stock: {
            decrement: 1,
            },
        },
    }); 
    
    return newBorrowedList
}

export async function handleReturn(memberCode: string, bookCode: string) {
    const borrowedBook = await prisma.borrowedList.findFirst({
        where: {
            memberCode,
            bookCode,
            returned: false
        }
    })
    if (!borrowedBook) throw 'Book is not borrowed by member.'

    const returnedBook = await prisma.borrowedList.update({
        where: {
            id: borrowedBook?.id
        },
        data: {
            returnDate: new Date(),
            returned: true
        }
    })

    await prisma.book.update({
        where: { 
            code:bookCode 
        },
        data: {
            stock: {
            increment: 1,
            },
        },
    }); 

    return returnedBook
}