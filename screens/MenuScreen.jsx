import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { pickImage } from '../components/common_functions';
import { UserContext } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = ({navigation}) => {

  const { user, setUser } = useContext(UserContext);


  const [userName, setUserName] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [photo, setPhoto] = useState(user.photo);
  

  useEffect(() => {

    setUserName(user.username);
    setPhoto(user.photo);
    setPhone(user.phone);

  }, [user]);

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.topCover}>
        <View style={styles.profileInfo}>

          <Image source={{ uri: photo }}
            style={styles.profilePicture}
            resizeMode="cover" />

          <TextInput
            style={styles.name}
            value={userName}
            onChangeText={text => setUserName(text)}
            editable={false}
          />
          <Text style={styles.phone}>{phone}</Text>

        </View>

      </View>
      <View style={styles.textFields}>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Profile') }}
          style={styles.inputPanel}>
          <View style={[{ flexDirection: 'row' }]}>
            <Icon name={'person'} size={18} />
            <Text style={{ fontWeight: 'bold', paddingStart: 10 }}>Personal informations</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputPanel}>
          <View style={[{ flexDirection: 'row' }]}>
            <Icon name={'car'} size={18} />
            <Text style={{ fontWeight: 'bold', paddingStart: 10 }}>Taxi informations</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputPanel}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name={'notifications'} size={18} />
            <Text style={{ fontWeight: 'bold', paddingStart: 10 }}>Notifications</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputPanel}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../images/history.png')} style={{ width: 20, height: 20 }} />
            <Text style={{ fontWeight: 'bold', paddingStart: 10 }}>History</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputPanel}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name={'settings'} size={18} />
            <Text style={{ fontWeight: 'bold', paddingStart: 10 }}>Account settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await signOut(auth);
            //setUser(null);
            navigation.navigate('LoginScreen');

          }}
          style={styles.inputPanel}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name={'log-out'} size={18} />
            <Text style={{ fontWeight: 'bold', paddingStart: 10 }}>Log out</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },

  topCover: {
    alignItems: 'center',
    backgroundColor: "#FFDC1C",
    justifyContent: 'flex-end',
    height: 200,
    elevation: 0,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#aaa',
    alignSelf: 'center',

  },
  profileInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    elevation: 2,
    zIndex: 1,
    width: '90%',
    height: 150,
    marginBottom: -50,
  },
  inputPanel: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'flex-start',
    paddingStart: 20,
    justifyContent: 'center',
    elevation: 1,
    zIndex: 1,
    width: '95%',
    height: 50,
    marginTop: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 3,
    color: 'black',
    alignSelf: 'center',
  },
  phone: {
    fontSize: 18,

  },

  textFields: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 55,

  },
});



export default MenuScreen;
