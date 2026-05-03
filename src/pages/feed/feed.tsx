import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feed-slice';
import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return <p className='text text_type_main-medium'>{error}</p>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
