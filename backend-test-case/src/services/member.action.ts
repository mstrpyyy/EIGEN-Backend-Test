import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function verifyMember(memberCode: string) {
    const member = await prisma.member.findFirst({
        where: {
            code: memberCode
        }
    })
    if (!member) throw 'Member not found.'

    const date = new Date()
    if (member.penaltyExpireDate && member.penaltyExpireDate < date) {
        await expireReset(memberCode)
    }

    return member
} 

export async function expireReset(memberCode: string) {
    await prisma.member.update({
        where: {
            code: memberCode
        },
        data: {
            penaltyExpireDate: null
        }
    })

    return
} 

export async function memberBorrowList(memberCode: string) {
    const borrowedList = await prisma.borrowedList.findMany({
        where: {
            memberCode,
            returned: false
        }
    })   

    return borrowedList
} 

export async function createPenalty(memberCode: string) {
    const penaltyExpireDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    
    await prisma.member.update({
        where: {
            code: memberCode
        }, 
        data: {
            penaltyExpireDate
        }
    })

    return
}
