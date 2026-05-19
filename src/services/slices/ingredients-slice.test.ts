import reducer, { getIngredients } from './ingredients-slice';
import { TIngredient } from '@utils-types';

const ingredients: TIngredient[] = [
  {
    _id: 'ingredient-1',
    name: 'Test ingredient',
    type: 'main',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: 'image.png',
    image_large: 'image-large.png',
    image_mobile: 'image-mobile.png'
  }
];

describe('ingredients reducer', () => {
  test('sets loading state on request', () => {
    expect(reducer(undefined, getIngredients.pending('request-id'))).toEqual({
      items: [],
      isLoading: true,
      error: null
    });
  });

  test('stores ingredients and clears loading state on success', () => {
    expect(
      reducer(undefined, getIngredients.fulfilled(ingredients, 'request-id'))
    ).toEqual({
      items: ingredients,
      isLoading: false,
      error: null
    });
  });

  test('stores error and clears loading state on failure', () => {
    const state = reducer(
      { items: [], isLoading: true, error: null },
      getIngredients.rejected(new Error('Request failed'), 'request-id')
    );

    expect(state).toEqual({
      items: [],
      isLoading: false,
      error: 'Request failed'
    });
  });
});
