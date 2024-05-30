import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Request Expired</Text>
      <Text style={styles.description}>
        Sorry, the request you are trying to access has expired.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
