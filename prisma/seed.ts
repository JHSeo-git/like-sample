import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function seed() {
  const likeTester = await client.user.create({
    data: {
      email: 'like_tester@gmail.com',
      name: 'like_tester',
    },
  });

  await Promise.all(
    getItems().map(async (item) => {
      const data = { userId: likeTester.id, ...item };
      await client.item.create({ data });
    })
  );

  console.log(`Database has been seeded. 🌱`);
}

seed();

function getItems() {
  return [
    {
      name: 'item 1',
      description: 'this is an item 1',
    },
    {
      name: 'item 2',
      description: 'this is an item 2',
    },
    {
      name: 'item 3',
      description: 'this is an item 3',
    },
    {
      name: 'item 4',
      description: 'this is an item 4',
    },
    {
      name: 'item 5',
      description: 'this is an item 5',
    },
  ];
}
