// DriverApp.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.0.119:3001'); // replace with your server URL

const DriverApp = () => {
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    socket.emit('registerDriver', 'driver1');

    socket.on('driverRequest', (request) => {
      console.log('Received driver request:', request);
      setCurrentRequest(request);
    });

    return () => { 
      socket.off('driverRequest');
    };
  }, []);

  const handleAccept = () => {
    if (currentRequest) {
      const response = {
        clientId: currentRequest.clientId,
        accepted: true,
      };
      socket.emit('driverResponse', response);
      setCurrentRequest(null); // Reset the current request after accepting
    }
  };

  const handleRefuse = () => {
    if (currentRequest) {
      const response = {
        clientId: currentRequest.clientId,
        accepted: false,
      };
      socket.emit('driverResponse', response);
      setCurrentRequest(null); // Reset the current request after refusing
    }
  };

  return (
    <View>
      <Text>Driver App</Text>
      {currentRequest ? (
        <View>
          <Text>New ride request received!</Text>
          <Button title="Accept" onPress={handleAccept} />
          <Button title="Refuse" onPress={handleRefuse} />
        </View>
      ) : (
        <Text>No current requests</Text>
      )}
    </View>
  );
};

export default DriverApp;
