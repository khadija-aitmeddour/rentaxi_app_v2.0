import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


import { auth } from '../config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';




const ProfileScreen = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


   function signin () {
    if (email && password) {
         createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('User account created!');
          sendEmailVerification(auth.currentUser,{
            handleCodeInApp: true,
            url:'https://rentaxi-backend.firebaseapp.com'

          })
            .then(() => {
              alert('Verification email sent!');
            })
            .catch((error) => {
              console.error('Error sending verification email:', error);
            }).then(() => {
              alert('adding the user someday..')
            })
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          } else {
            console.error('Error creating user account:', error);
          }
        });
    }
  }
  

 
  const handleSave = () => {
    // Implement logic to save user information to server/database
    console.log('Saving user information...');
  };

  return (
    <View style={styles.container}>
      <Text>Under construction.....</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={styles.saveButton} onPress={signin}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: 'tomato',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
