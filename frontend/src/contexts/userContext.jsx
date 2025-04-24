import { createContext, useContext, useReducer } from 'react';

// LECTURE 237

// Creating the context
const UserContext = createContext();

const initialState = {
  // User object from api fetch
  user: null,
  // Has valid (not expired) jwt cookie
  isAuthorized: false,
  // Is logged in
  isLoggedIn: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'loggedIn':
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
        isAuthorized: true,
      };
    case 'loggedOut':
      return {
        initialState,
      };
    default:
      throw new Error('Something went wrong in the UserContext reducer');
  }
}

// Context Provider (provides context to all children)
function UserProvider({ children }) {
  const [{ user, isAuthorized, isLoggedIn }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <UserContext.Provider value={{ user, isAuthorized, isLoggedIn, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// Context custom hook (UserContext API)
function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('UserContext was used outside of UserProvider');
  return context;
}

export { UserProvider, useUsers };
