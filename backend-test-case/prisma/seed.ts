import { PrismaClient } from "@prisma/client";
import { bookSeed } from "./models/books";
import { memberSeed } from "./models/member";


const prisma = new PrismaClient();

async function main() {
    try {
        const books = await bookSeed()
        await prisma.book.createMany({
            data: books,
            skipDuplicates: true
        })

        const members = await memberSeed()
        await prisma.member.createMany({
            data: members,
            skipDuplicates: true
        })

        console.log('Data successfully seeded.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }   
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });