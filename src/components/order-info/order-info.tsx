import { FC, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectIngredients,
  selectProfileOrders,
  selectSelectedOrder
} from '../../services/selectors';
import { getOrderByNumber } from '../../services/slices/order-slice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderNumber = Number(number);
  const feedOrders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);
  const selectedOrder = useSelector(selectSelectedOrder);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const requestedOrderNumber = useRef<number | null>(null);
  const orderData =
    feedOrders.find((order) => order.number === orderNumber) ||
    profileOrders.find((order) => order.number === orderNumber) ||
    selectedOrder;

  useEffect(() => {
    if (
      Number.isFinite(orderNumber) &&
      !orderData &&
      requestedOrderNumber.current !== orderNumber
    ) {
      requestedOrderNumber.current = orderNumber;
      dispatch(getOrderByNumber(orderNumber));
    }
  }, [dispatch, orderData, orderNumber]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
