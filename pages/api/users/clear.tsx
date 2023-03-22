import { NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient({log: ["query"]})

    try {
        const {deleteUser: userData} = req.body;

        const deleteUser = await prisma.user.deleteMany({
            
        });

        res.status(200);
        res.json({deleteUser});
    } catch(e) {

        res.status(500);
        res.json({error: "Sorry unable to delete user in database"});
    } finally {
        await prisma.$disconnect()
    }


    res.status(201);
    res.json({deleteUser: "deleted"});

}