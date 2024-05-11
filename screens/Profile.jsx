import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import DropdownComponent from '../components/DropdownComponent';

const Profile = ({route}) => {

  const  user  = route.params;
  
  const [name, setName] = useState('');
  const [userName, setUserName] = useState(user ? user.username : '');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState(user ? user.phone : 'xx-xxxx-xxxx');
  const [email, setEmail] = useState(user ? user.email : '');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState(user ? user.photo : 'https://via.placeholder.com/75');
  const [isEditable, setIsEditable] = useState(false);
  let iconName = 'pencil';


  const handleSave = () => {
    setIsEditable(false);
    console.log('Saving user information...');
  };


  return (

    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topCover}>
         
                <Image source={{ uri: photo }}
                  style={styles.profilePicture}
                  resizeMode="cover" />
             
              <View style={{ flexDirection: 'row', paddingStart: 10 }}>
                <TextInput
                  style={styles.name}
                  value={userName}

                  editable={isEditable}
                />
                <TouchableOpacity onPress={() => { setIsEditable(true) }}>
                  <Icon name={iconName} size={20} />
                </TouchableOpacity>
              </View>

              <Text style={styles.phone}>{phone}</Text>
           
          
        </View>

        <View style={styles.textFields}>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            editable={isEditable}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={text => setPhone(text)}
            editable={isEditable}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            editable={isEditable}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={text => setAddress(text)}
            editable={isEditable}
          />
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            value={birthday}
            onChangeText={text => setBirthday(text)}
            editable={isEditable}
          />
          <Text style={styles.label}>Gender:</Text>
          
          <DropdownComponent
          disable={!isEditable}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  topCover: {
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'center',
    height: 300,
    elevation: 0,
    marginBottom: 0,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',

  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingRight: 3,
    color: 'black'
  },
  phone: {
    fontSize: 18,

  },

  textFields: {
    flex: 1,
    padding: 20,
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
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#FFDC1C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
