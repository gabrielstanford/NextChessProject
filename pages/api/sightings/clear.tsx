import { NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient({log: ["query"]})

    try {
        const {deleteSighting: sightingData} = req.body;

        const deleteSighting = await prisma.user.deleteMany({
            
        });

        res.status(200);
        res.json({deleteSighting});
    } catch(e) {

        res.status(500);
        res.json({error: "Sorry unable to delete sighting in database"});
    } finally {
        await prisma.$disconnect()
    }


    res.status(201);
    res.json({deletSighting: "deleted"});

}