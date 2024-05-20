import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { pickImage } from '../components/common_functions';
import { UserContext } from '../context/UserContext';

const Profile = () => {

  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user.fullName);
  const [userName, setUserName] = useState(user.username);
  const [address, setAddress] = useState(user.address);
  const [birthday, setBirthday] = useState(user.birthday);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(user.photo);
  const [isEditable, setIsEditable] = useState(false);
  const [editText, setEditText] = useState('Edit profile');
  const [editIcon, setEditIcon] = useState('pencil');
  const [editColor, setEditColor] = useState('#FFDC1C');

  
  const handleSave = () => {
    setIsEditable(false);
    console.log('Saving user information...');
    setPhone(phone);
    setUser({
      ...user,
      fullName: name,
      username: userName,
      address: address,
      birthday: birthday,
      phone: phone,
      email: email,
      photo: photo,
    });
  };


  return (

    <ScrollView contentContainerStyle={styles.container}>
     
        <View style={styles.topCover}>
         <View style={styles.profileInfo}>
              <TouchableOpacity 
              onPress={async() => {
                const img = await pickImage();
                if (img) {
                setPhoto(img);
                setUser({ ...user, photo: img });
                }
                console.log('Photo selected: ', img);
              }}
              style={{zIndex: 2 }}  
                >
                <Image source={{ uri: photo }}
                  style={styles.profilePicture}
                  resizeMode="cover" />  
              
              </TouchableOpacity>  
             
              
                <TextInput
                  style={styles.name}
                  value={userName}
                  onChangeText={text => setUserName(text)}
                  editable={false}
                />
                <Text style={styles.phone}>{phone}</Text>
                <TouchableOpacity onPress={() => { 
                  if (isEditable) {
                    handleSave();
                    setEditText('Edit profile');
                    setEditIcon('pencil');
                    setEditColor('#FFDC1C');
                  } else {
                    setIsEditable(true);
                    setEditText('Save changes');
                    setEditIcon(null);
                    setEditColor('#93C572');
                  }
                 }}>
                  <View style={{
                    flexDirection: 'row', 
                    borderWidth:1,
                    paddingHorizontal: 7, 
                    borderRadius: 5,
                    borderColor: '#fff',
                    backgroundColor: editColor,
                    
                  }}>
                    <Text style={{fontSize: 16, marginEnd: 5, fontWeight: '600'}}>{editText}</Text>
                    <Icon name={editIcon} size={16} />
                  </View>
                </TouchableOpacity>
              </View>

              
           
          
        </View>
        <View style={{marginTop: 56}}></View>
        <ScrollView contentContainerStyle={styles.textFields}>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={text => setUserName(text)}
            editable={isEditable}
          />
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
          
          
        </ScrollView>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  topCover: {
    alignItems: 'center',
    backgroundColor: "#FFDC1C",
    justifyContent: 'flex-end',
    height: 180,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    alignSelf: 'center',
  },
  phone: {
    fontSize: 18,

  },

  textFields: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',

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
