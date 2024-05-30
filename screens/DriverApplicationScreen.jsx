import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { pickPdf, pickImage } from '../components/common_functions';

const DriverApplicationScreen = ({route}) => {
  const { uid, email, username, phone } = route.params;
  const [fullName, setFullName] = useState('');
  const [cardIdNumber, setCardIdNumber] = useState('');
  const [drivingLicencePicture, setDrivingLicencePicture] = useState(null);
  const [nationalCardPicture, setNationalCardPicture] = useState(null);
  const [taxiLicencePicture, setTaxiLicencePicture] = useState(null);
  const [carnetDePlacePDF, setCarnetDePlacePDF] = useState(null);
  const navigation = useNavigation();
  
  const handleSubmit = () => {
   navigation.navigate('AddTaxiScreen', {uid, email, username, phone, fullName, cardIdNumber, drivingLicencePicture, nationalCardPicture, taxiLicencePicture, carnetDePlacePDF});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <ScrollView>
      <View>
       
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />
        <Text style={styles.label}>Card ID Number:</Text>
        <TextInput
          style={styles.input}
          value={cardIdNumber}
          onChangeText={setCardIdNumber}
          placeholder="Enter your card ID number"
          keyboardType="numeric"
        />

        <TouchableOpacity 
         onPress={async() => {
          const img = await pickImage();
          setNationalCardPicture(img);
        }} 
        style={styles.button}>
          <Text style={styles.buttonText}>Select National Card Picture</Text>
          <Icon name={'image'} size={20} color={'#000'} />
        </TouchableOpacity>
        {nationalCardPicture && <Image source={{ uri: nationalCardPicture }} style={styles.image} />}

        <TouchableOpacity 
         onPress={async() => {
          const img = await pickImage();
          if(img) {
          setDrivingLicencePicture(img);
          }
        }} 
        style={styles.button}>
          <Text style={styles.buttonText}>Select Driving Licence Picture</Text>
          <Icon name={'image'} size={20} color={'#000'} />
        </TouchableOpacity>
        {drivingLicencePicture && <Image source={{ uri: drivingLicencePicture }} style={styles.image} />}


        
        <TouchableOpacity 
        onPress={
            async() => {
              const pdf = await pickPdf(); 
              if(pdf) {
              setCarnetDePlacePDF(pdf); 
              }
            }} 
        style={styles.button}>
          <Text style={styles.buttonText}>Select Carnet De Place PDF</Text>
          <Image source={require('../images/pdf.png')} style={{ width: 22, height: 22 }} />
        </TouchableOpacity>
        {carnetDePlacePDF && <Text style={styles.uploadedText}>PDF Uploaded: {carnetDePlacePDF}</Text>}
      </View>
    </ScrollView>
      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.saveButton]}>
        <Text style={[styles.buttonText, {fontWeight: 'bold'}]}>Continue</Text>
      </TouchableOpacity>
     </ScrollView> 
  );
};

export default DriverApplicationScreen;

const styles = {
  container: {
    backgroundColor: '#fff',
    padding:30,
    paddingTop: 20,
    paddingBottom: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 25,
    paddingHorizontal: 5,
    color: 'black',
    width: '100%',
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
  },
  button: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#FFDC1C',
    borderBottomWidth: 0,
    justifyContent: 'center',
    marginTop: 40,
  },
  uploadedText: {
    marginBottom: 20,
    fontSize: 16,
    color: 'green',
    paddingHorizontal: 10,
},
image: {
    alignSelf: 'center',
    width: '80%',
    height: 170,
    marginBottom: 30,
    borderRadius: 8,
    
},
};
