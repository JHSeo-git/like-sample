import { Item } from '@prisma/client';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import type { ExtendedItem } from '../../pages/items';

export interface ItemCardProps {
  item: ExtendedItem;
}

function ItemCard({ item }: ItemCardProps) {
  const [like, setLike] = useState(item.likes.length > 0);
  const [likeCount, setLikeCount] = useState(item._count.likes);
  const { fetchData, data, error, isLoading } = useFetch<Item>();

  const handleLike = async () => {
    setLike(!like);
    setLikeCount(likeCount + (like ? -1 : 1));

    await fetchData(`/api/items/${item.id}/${like ? 'unlike' : 'like'}`, {
      method: 'PUT',
      // FIXME: client state's user info
      body: JSON.stringify({
        email: 'like_tester@gmail.com',
      }),
    });
  };

  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p>{item.description}</p>
        <div className="card-actions justify-end">
          <button
            className="flex gap-2 items-center bg-base-100 btn btn-sm btn-ghost"
            onClick={handleLike}
          >
            <span
              className={`mask mask-heart bg-secondary w-4 h-4 transition-opacity ${
                like ? 'opacity-100' : 'opacity-10'
              }`}
            />
            <span className="tabular-nums">{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
