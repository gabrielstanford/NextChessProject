import { NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient({log: ["query"]})

    try {
        await prisma.level.deleteMany(
        //     {
        //     where: {
        //         id: 133 // specify the ID of the user you want to delete
        //     },
        //     // enable cascade delete if needed
        //     include: {
                
        //     }
        // }
        );

        res.status(200);
    
    } catch(e) {
        console.error(e)
        res.status(500);
        res.json({error: "Sorry unable to delete user in database"});
    } finally {
        await prisma.$disconnect()
    }

}