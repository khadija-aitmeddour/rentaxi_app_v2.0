// ReservationDetailsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReservationDetailsScreen = ({ route }) => {
  // Extract reservation details from the route params
  const reservationDetails  = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reservation Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>price :</Text>
        <Text style={styles.value}>{reservationDetails.price}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>position:</Text>
        <Text style={styles.value}>{reservationDetails.myPosition}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>destination:</Text>
        <Text style={styles.value}>{reservationDetails.destination}</Text>
      </View>
      {/* Add more reservation details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
});

export default ReservationDetailsScreen;
