import { NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const prisma = new PrismaClient({log: ["query"]})

    try {
        const {user: userData} = req.body;
        const user = await prisma.user.create({
            data: {
                isNew: userData.isNew,
                numCorrect: userData.numCorrect,
                firstProbCorrect: userData.firstProbCorrect,
                secondProbCorrect: userData.secondProbCorrect,
                thirdProbCorrect: userData.thirdProbCorrect,
                fourthProbCorrect: userData.fourthProbCorrect,
                fifthProbCorrect: userData.fifthProbCorrect,
                sixthProbCorrect: userData.sixthProbCorrect,
                seventhProbCorrect: userData.seventhProbCorrect
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