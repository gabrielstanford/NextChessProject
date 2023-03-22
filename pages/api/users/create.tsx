import { NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient({log: ["query"]})

    try {
        const {user: userData} = req.body;
        const user = await prisma.user.create({
            data: {
                level1: userData.level1,
                level2: userData.level2,
                level3: userData.level3,
                level4: userData.level4,
                level5: userData.level5,
                level6: userData.level6
            }
        });

        res.status(201);
        res.json({user});
    } catch(e) {

        res.status(500);
        res.json({error: "Sorry unable to save user to database"});
    } finally {
        await prisma.$disconnect()
    }


    res.status(201);
    res.json({user: "saved"});
}