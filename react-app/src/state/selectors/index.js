import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectRegister = createSelector([selectUser], (user) =>
  user ? user.register : {}
);
export const selectLogin = createSelector([selectUser], (user) =>
  user ? user.login : {}
);
export const selectUserGetAll = createSelector([selectUser], (user) =>
  user ? user.userGetAll : {}
);
export const selectUserEdit = createSelector([selectUser], (user) =>
  user ? user.userEdit : {}
);
export const selectUserDelete = createSelector([selectUser], (user) =>
  user ? user.userDelete : {}
);
