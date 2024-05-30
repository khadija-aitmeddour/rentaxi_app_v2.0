import React, { createContext, useState } from 'react';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    uid: '',
    username: 'guest',
    fullName: '',
    photo: 'https://picsum.photos/200/300',
    email: '',  
    phone: '999 9999 999',
    address: '',
    birthday: '',
    expoPushToken: '',
    
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
