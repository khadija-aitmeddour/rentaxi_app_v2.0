import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.0.119:3001');

export default function ReservationDetails({ route }) {
  const { reservationDetails } = route.params;
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    socket.emit('registerDriver', 'driver1');

    socket.on('driverRequest', (request) => {
      console.log('Received driver request:', request);
      setCurrentRequest(request);
      console.log('heeeee-------------------',currentRequest);
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
      setCurrentRequest(null); 
    }
  };

  const handleDecline = () => {

    console.log('Reservation declined');
  };
  console.log(reservationDetails);
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: reservationDetails.photo }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.username}>{reservationDetails.username}</Text>
        <Text style={{ fontSize: 14, color: '#333', paddingTop: 5 }}> is requesting your services !</Text>
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
    alignSelf: 'center'
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
