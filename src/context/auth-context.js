import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  type: null,
  id: null,
  username: null,
  email: null,
  roles: null,
  setNewContext : () => {}
});
