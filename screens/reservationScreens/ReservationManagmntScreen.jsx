import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/UserContext';
import { localhost } from '../../localhostConfig';

const ReservationManagmntScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getReservations = async (uid) => {
      const endpoint = `${localhost}/reservations/${uid}`;
      await fetch(endpoint)
      .then(response => response.json()) 
      .then(data => {
        setReservations(data);
      })
      .catch(error => console.log(error));
    }
    getReservations(user.uid);
  }, [reservations]);

  const handleViewDetails = (numRes) => {
    const reservation = reservations.find(reservation => reservation.numRes === numRes);
    if (reservation) {
      
      if (user.typeUser === 'customer') {
        navigation.navigate('ClientInfos', { uid: reservation.uid });
      } else {
        navigation.navigate('DriverInfos', { driverUid: reservation.uid });
    }}
  };

  return (
      
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Reservations Management</Text>
        {reservations.map(item => (
          <View key={item.numRes} style={styles.reservationContainer}>
            <Text style={styles.reservationDetails}>{item.pickupLocation}</Text>
            <Text style={styles.reservationDetails}>{item.pickoffLocation}</Text>
            <Text style={[styles.reservationStatus, styles[item.status]]}>
              {item.status.toUpperCase()}
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleViewDetails(item.numRes)}
            >
              <Text style={styles.actionButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  reservationContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reservationDetails: {
    fontSize: 14,
    marginBottom: 8,
  },
  reservationStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pending: {
    color: 'orange',
  },
  completed: {
    color: 'green',
  },
  canceled: {
    color: 'red',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFDC1C',
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReservationManagmntScreen;
