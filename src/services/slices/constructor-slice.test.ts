import reducer, {
  addIngredient,
  moveIngredient,
  removeIngredient
} from './constructor-slice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Test bun',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'bun.png',
  image_large: 'bun-large.png',
  image_mobile: 'bun-mobile.png'
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Test main',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 200,
  image: 'main.png',
  image_large: 'main-large.png',
  image_mobile: 'main-mobile.png'
};

describe('burgerConstructor reducer', () => {
  test('adds a bun ingredient to the constructor bun slot', () => {
    expect(reducer(undefined, addIngredient(bun))).toEqual({
      bun,
      ingredients: []
    });
  });

  test('adds a filling ingredient with a generated constructor id', () => {
    const state = reducer(undefined, addIngredient(main));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...main,
      id: expect.any(String)
    });
  });

  test('removes a filling ingredient by constructor id', () => {
    const ingredient: TConstructorIngredient = { ...main, id: 'main-row-1' };
    const state = reducer(
      { bun: null, ingredients: [ingredient] },
      removeIngredient(ingredient.id)
    );

    expect(state.ingredients).toEqual([]);
  });

  test('changes the order of filling ingredients', () => {
    const first: TConstructorIngredient = { ...main, id: 'first' };
    const second: TConstructorIngredient = {
      ...main,
      _id: 'main-2',
      name: 'Second main',
      id: 'second'
    };
    const state = reducer(
      { bun: null, ingredients: [first, second] },
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients).toEqual([second, first]);
  });
});
