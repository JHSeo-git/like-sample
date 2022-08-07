import type { Item } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import ItemCard from '../../components/ItemCard';
import { getAuth } from '../../lib/auth';
import { db, SerializedModel } from '../../lib/db';

export type ExtendedItem = SerializedModel<Item> & {
  likes: {
    id: number;
  }[];
  _count: {
    likes: number;
  };
};

type Props = {
  items: ExtendedItem[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const user = await getAuth();
  const items = await db.item.findMany({
    include: {
      likes: {
        select: {
          id: true,
        },
        where: {
          userId: user?.id,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  const serialized = items.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  return {
    props: {
      items: serialized,
    },
  };
};

const ItemsPage: NextPage<Props> = ({ items }) => {
  return (
    <div className="card">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="my-8">
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsPage;
