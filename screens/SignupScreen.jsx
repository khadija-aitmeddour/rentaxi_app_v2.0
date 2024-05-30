import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { set } from 'firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

const SignupScreen = ({ navigation, route }) => {
  const [userUid, setUserUid] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const { typeUser } = route.params;

  function addCustomer(uid) {
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const endpoint = "http://192.168.0.119:3000/users";
    const user = {
      uid: uid,
      username: username,
      email: email,
      phone: phone,
      typeUser: 'customer',
      photo: 'https://picsum.photos/200/300',
    }
    options = {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(user),
    }

    fetch(endpoint, options).then(response => {
      if (response.ok) {
        console.log("User added to database");
      }

    });
  }
 
  const signup = async () => {
    if (username === '') {
      alert('Please enter a username');
      return;
    }
    if(password != confirmPassword){
      alert('Passwords do not match');
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(
        async (userCredential) => {
          console.log('User account created!');
          const user = userCredential.user;
          const uid = user.uid;
         
          await sendEmailVerification(user)
            .then(
              () => {
                console.log('Email verification sent!');
                setUsername('');
                setEmail('');
                setPassword('');
                setconfirmPassword('');
                setPhone('');

           }).catch(
              (error) => {
                console.error('Error sending verification email:', error);
              })

        if (typeUser === 'customer') {
          navigation.navigate('LoginScreen');
          addCustomer(uid);      

        }else if(typeUser === 'driver'){
          navigation.navigate('DriverApplicationScreen', {uid: uid, username, email: email, phone: phone});
        }
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email already in use');
        }else if (error.code === 'auth/invalid-email') {
          alert('Invalid email');
        }else if(error.code === 'auth/weak-password'){
          alert('Password is too weak');
        }else{
          alert('An error occurred');
        }
      });
  }


  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return ( 
  <ScrollView contentContainerStyle={styles.container}> 
      <Image
        source={require('../images/logo.png')}
        style={{ height: 65, width: 65 }}

      />
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputFields}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          icon
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          icon
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          icon
          keyboardType='numeric'
        />
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secure}
          />
          <TouchableOpacity
            style={styles.visibilityIcon}
            onPress={() => { setSecure(!secure); }}
          >
            <Icon name={secure ? 'eye' : 'eye-off'} size={18} color="#121212" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Confirm password"
            onChangeText={setconfirmPassword}
            value={confirmPassword}
            secureTextEntry={secure2}
          />
          <TouchableOpacity
            style={styles.visibilityIcon}
            onPress={() => { setSecure2(!secure2); }}
          >
            <Icon name={secure2 ? 'eye' : 'eye-off'} size={18} color="#121212" />
          </TouchableOpacity>
        </View>
      </View>


      <TouchableOpacity
        onPress={signup}
        style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={handleLogin}
        >
        <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  title: {
    fontSize: 28,
  },
  inputFields: {

    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 30
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    color: 'black'
  },
  visibilityIcon: {
    position: 'absolute',
    right: 10,
  },
  button: {

    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: '#FFDC1C',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 17,
    color: '#121212',
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    alignSelf: 'flex-end',
    fontSize: 13
  },
});

export default SignupScreen;
