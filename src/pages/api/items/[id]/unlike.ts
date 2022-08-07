import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/db';

export default async function itemUnlikeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method, body } = req;

  if (method !== 'PUT') {
    res.status(405).json({ error: 'Method PUT not allowed' });
    return;
  }

  const { id } = query;

  if (typeof id !== 'string') {
    res.status(400).json({ error: '[itemId] not provided' });
    return;
  }

  const itemId = Number.parseInt(id, 10);

  if (itemId === NaN) {
    res.status(400).json({
      error: '[itemId] not a number',
    });
    return;
  }

  const { email } = body;

  if (typeof email !== 'string') {
    res.status(400).json({ error: '[email] not provided' });
    return;
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const item = await db.item.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }

  const foundLike = await db.like.findUnique({
    where: {
      itemId_userId: {
        itemId: item.id,
        userId: user.id,
      },
    },
  });

  if (!foundLike) {
    res.status(200).json({ item });
    return;
  }

  const deletedLike = await db.like.delete({
    where: {
      id: foundLike.id,
    },
  });

  if (!deletedLike) {
    res.status(500).json({ error: 'Unlike did not worked' });
    return;
  }

  res.status(200).json({
    item,
  });
}
