import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, BackHandler } from 'react-native';
import io from 'socket.io-client';
import { UserContext } from '../../context/UserContext';
import { localhost, webSocketServerURL } from '../../localhostConfig';


const socket = io(webSocketServerURL);

export default function ReservationDetails({ navigation, route }) {
  const { reservationDetails } = route.params;
  const [currentRequest, setCurrentRequest] = useState(null);
  const { user } = useContext(UserContext);
  const [taxiCode, setTaxiCode] = useState('');

  useEffect(() => {
    const getTaxiCode = async () => {
      const endpoint = `${localhost}/taxis/taxi/${user.uid}`;
      await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          setTaxiCode(data[0].taxiCode);
        }).catch(error => console.log(error));
    };
    getTaxiCode();
  }, []);
  
  const saveReservation = async () => {
    const endpoint = `${localhost}/reservations`;
    const reservation = {
      uid: currentRequest.uid,
      taxiCode: taxiCode,
      pickupLocation: reservationDetails.myPosition,
      pickoffLocation: reservationDetails.destination,
      distance: reservationDetails.distance,
      price: reservationDetails.price,
      taxiType: reservationDetails.selectedTaxiType,
      status: 'pending',
    };

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Reservation saved:', data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    
    socket.emit('registerDriver', user.uid);
    console.log('Registered driver:', user.uid);
    socket.on('driverRequest', (request) => {
      console.log('Received driver request:', request);
      setCurrentRequest(request);
    });

    return () => {
      socket.off('driverRequest');
    };
  }, [user.uid]);
  
  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate('Home');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [navigation]);
  
  useEffect(() => {
    socket.on('cancelNotification', (data) => {
      console.log('Cancel notification received for client:', data.clientId);
      navigation.navigate('Not Found');
    });

    return () => {
      socket.off('cancelNotification');
    };
  }, [navigation]);

  const handleAccept = async () => {
    
      const response = {
        clientId: currentRequest.clientId,
        uid: user.uid,
        accepted: true,
      };
      console.log('Accepted request:', response);
      socket.emit('driverResponse', response);
      await saveReservation();
      navigation.navigate('ClientInfos', currentRequest);
    
  };

  const handleDecline = () => {
    if (currentRequest) {
      const response = {
        clientId: currentRequest.clientId,
        uid: user.uid,
        accepted: false,
      };
      socket.emit('driverResponse', response);
      setCurrentRequest(null);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {currentRequest && currentRequest.clientId ? (
        <>
      <View style={styles.profileContainer}>
      
        <Image
          source={{ uri: reservationDetails.photo }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.username}>{reservationDetails.username}</Text>
        <Text style={{ fontSize: 14, color: '#333', paddingTop: 5 }}>is requesting your services!</Text>
      </View>
      <View>
        <Text style={styles.title}>Reservation Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Client Location</Text>
          <Text style={styles.value}>{reservationDetails.myPosition}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Client Destination</Text>
          <Text style={styles.value}>{reservationDetails.destination}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{reservationDetails.distance} Km</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Calculated Price</Text>
          <Text style={styles.value}>{reservationDetails.price} DZD</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
        </>
        ) : (
          <ActivityIndicator style={{alignSelf:'center'}} size="large" color="#FFDC1C" />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: '#FFDC1C',
    padding: 10,
    borderRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
