import { NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});

    try {
        const levels = await prisma.user.findMany();
        res.status(200);
        res.json({levels});
    } catch(e) {    
        res.status(500);
        res.json({error: "Unable to fetch levels"});

    } finally {
        await prisma.$disconnect();
    }

}