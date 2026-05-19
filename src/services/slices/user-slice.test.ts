import reducer, { checkUserAuth, loginUser, logoutUser } from './user-slice';

const user = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('user reducer', () => {
  test('sets loading state on login request', () => {
    expect(
      reducer(
        undefined,
        loginUser.pending('request-id', {
          email: 'test@example.com',
          password: 'password'
        })
      )
    ).toEqual({
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null
    });
  });

  test('stores user and clears loading state on login success', () => {
    const state = reducer(
      undefined,
      loginUser.fulfilled(user, 'request-id', {
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state).toEqual({
      user,
      isAuthChecked: true,
      isLoading: false,
      error: null
    });
  });

  test('stores error and clears loading state on login failure', () => {
    const state = reducer(
      undefined,
      loginUser.rejected(new Error('Login failed'), 'request-id', {
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  test('marks auth as checked on auth check success', () => {
    const state = reducer(
      undefined,
      checkUserAuth.fulfilled(user, 'request-id')
    );

    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  test('clears user on logout success', () => {
    const state = reducer(
      {
        user,
        isAuthChecked: true,
        isLoading: false,
        error: 'Old error'
      },
      logoutUser.fulfilled(undefined, 'request-id')
    );

    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });
});
