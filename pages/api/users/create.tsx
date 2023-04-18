import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log('running');
  const prisma = new PrismaClient({ log: ['query'] });

  try {
    const { user: userData } = req.body;

    // Check if required data is present in the request body
    if (!userData || !userData.email) {
      throw new Error('Invalid request body');
    }

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        level: userData.level
      },
    });

    res.status(201);
    res.json({ user });
  } catch (e) {
    console.error(e); // Log the error for debugging purposes
    res.status(500);
    res.json({ error: 'Unable to save user to database' });
  } finally {
    await prisma.$disconnect();
  }
}