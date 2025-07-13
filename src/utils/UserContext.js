import { createContext } from 'react';

const UserContext = createContext({
  loggedInUser: 'Default User',
});

export default UserContext;

// import { createContext } from 'react';

// const UserContext = createContext({
//   loggedInUser: 'Default User',
//   setUserName: () => {}, // ✅ add this dummy function to avoid undefined error
// });

// export default UserContext;