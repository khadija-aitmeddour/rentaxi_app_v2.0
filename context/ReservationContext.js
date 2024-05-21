import React, { createContext, useState } from 'react';


export const ReservationContext = createContext();


export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState({
    myPostion: '',
    destination: '',
    positionCoords: null,
    destinationCoords: null,
    myRoute: null,
    distance: 0,
    price: 0,
    taxiType: 'classic',
    status : '',
    timeElapsed: 0
    

    
  });

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );

};
