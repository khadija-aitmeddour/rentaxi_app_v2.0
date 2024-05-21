// ClientApp.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.0.119:3001'); // replace with your server URL

const ClientApp = () => {
  const [status, setStatus] = useState('Idle');
  const [location, setLocation] = useState('here');

  useEffect(() => {
    socket.on('driverResponse', (response) => {
      console.log(response);
    });

    return () => {
      socket.off('driverResponse');
    };
  }, []);

  const sendRequest = () => {
    socket.emit('clientRequest', { clientId: socket.id});
    setStatus('Waiting for a driver response...');
  };

  return (
    <View>
      
      <Button title="Request Driver" onPress={sendRequest} />
      <Text>Status: {status}</Text>
    </View>
  );
};

export default ClientApp;
