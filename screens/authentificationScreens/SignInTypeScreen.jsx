import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SquareIconButton from '../../components/SquareIconButton'; // Import the SquareIconButton component

const SignInTypeScreen = ({ navigation }) => {
  const [typeUser, setTypeUser] = useState('');


  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>Please select your role:</Text>
      <View style={styles.buttonContainer}>
        <SquareIconButton
          iconName="user"
          text="Customer"
          onPress={() => navigation.navigate('SignupScreen', {typeUser: "customer"})}
        />
        <SquareIconButton
          iconName="car"
          text="Driver"
          onPress={() => navigation.navigate('SignupScreen', {typeUser: "driver"})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }, 
  promptText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default SignInTypeScreen;
