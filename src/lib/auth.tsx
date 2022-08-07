import { db } from './db';

export async function getAuth() {
  const userId = 1;

  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
}
