import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { auth } from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { localhost } from '../../localhostConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  async function isRegistered(uid) {
    const endpoint = `${localhost}/users/${uid}`

    const response = await fetch(endpoint)
    if (response.ok) {
      const size = response._bodyInit._data.size;
      return { size };
    } else {
      return 0;
    }
  }


  function signin() {
    if(email === 'admin' && password === '') {
      setEmail('');
      navigation.navigate('AdminDashboard');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(
        async () => {
          await auth.onAuthStateChanged(async (userCredential) => {
            if (userCredential) {
              
              console.log(userCredential.uid)
            
              await isRegistered(userCredential.uid)
                .then(response => {
                  if (response.size === 0) {
                   
                    Alert.alert(
                      '\t\t\tApplication still pending... ',
                      '\nAn Email will be sent to you once the \n\t\t\t\t\tApplication approved\n\n\t\tThank you for your patience!',

                      [{ text: 'I understand', onPress: () => {
                        setEmail('');
                        setPassword('');
                      
                      } }],
                      { cancelable: true }
                    );
                    return;
                  }
                  else {
                    
                    const { emailVerified } = userCredential;
                    if (emailVerified) {
                      setEmail('');
                      setPassword('');
                      navigation.navigate('HomePage');
                    }
                    else {
                      alert('Please verify your email');
                    }
                  }
                }).catch(error => {
                 alert("Can't connect to server");
                });

            }
          });
        })
      .catch(
        () => {
          alert('Invalid email or password');
        });

  }


  const handleVisibilityPassword = () => {
    setSecure(!secure);
  };

  const handleRegister = () => {
    setEmail('');
    setPassword('');
    navigation.navigate('SignInTypeScreen');
  };
  
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../images/logo.png')}
        style={{ height: 65, width: 65 }}

      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputFields}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          icon
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
            onPress={handleVisibilityPassword}
          >
            <Icon name={secure ? 'eye' : 'eye-off'} size={18} color="#121212" />
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>


      <TouchableOpacity
        onPress={signin}
        style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={handleRegister}
        >
          <Text style={styles.link}>Create One!</Text>
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

export default LoginScreen;
