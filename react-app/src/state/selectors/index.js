import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectRegister = createSelector([selectUser], (user) =>
  user ? user.register : {}
);
export const selectLogin = createSelector([selectUser], (user) =>
  user ? user.login : {}
);
