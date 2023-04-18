import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log('running twice?')
    const prisma = new PrismaClient({ log: ["query"] });

    try {
        const { level: levelData } = req.body;
        const level = await prisma.level.create({
            data: {
                userEmail: levelData.userEmail,
                isNew: levelData.isNew,
                numCorrect: levelData.isCorrect,
                firstProbCorrect: levelData.firstProbCorrect,
                secondProbCorrect: levelData.secondProbCorrect,
                thirdProbCorrect: levelData.thirdProbCorrect,
                fourthProbCorrect: levelData.fourthProbCorrect,
                fifthProbCorrect: levelData.fifthProbCorrect,
                sixthProbCorrect: levelData.sixthProbCorrect,
                seventhProbCorrect: levelData.seventhProbCorrect,
            }
        });

        res.status(201)
        res.json({ level });
        console.log('completed query')
    } catch (e) {
        console.error(e);
        res.status(500)
        res.json({ error: "Sorry, unable to save level to the database" });
    } finally {
        await prisma.$disconnect()
    }

}