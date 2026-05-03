import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
export const selectIngredientById = (id?: string) => (state: RootState) =>
  state.ingredients.items.find((ingredient) => ingredient._id === id);
export const selectIngredientsByType = (type: string) => (state: RootState) =>
  state.ingredients.items.filter((ingredient) => ingredient.type === type);

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const selectSelectedOrder = (state: RootState) =>
  state.order.selectedOrder;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectFeed = (state: RootState) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.user.user);
export const selectUserError = (state: RootState) => state.user.error;
