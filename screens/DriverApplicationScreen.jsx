import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';



const DriverApplicationScreen = () => {
  const [fullName, setFullName] = useState('');
  const [cardIdNumber, setCardIdNumber] = useState('');
  const [drivingLicencePicture, setDrivingLicencePicture] = useState(null);
  const [nationalCardPicture, setNationalCardPicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [taxiLicencePicture, setTaxiLicencePicture] = useState(null);
  const [carnetDePlacePDF, setCarnetDePlacePDF] = useState(null);

  const handleSubmit = () => {
    
    console.log({
      fullName,
      cardIdNumber,
      drivingLicencePicture,
      nationalCardPicture,
      phoneNumber,
      taxiLicencePicture,
      carnetDePlacePDF
    });
  };
  var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
 

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Full Name:</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />
      <Text>Card ID Number:</Text>
      <TextInput
        value={cardIdNumber}
        onChangeText={setCardIdNumber}
        placeholder="Enter your card ID number"
        keyboardType="numeric"
      />
      <TouchableOpacity >
        <Text>Select Driving Licence Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text>Select National Card Picture</Text>
      </TouchableOpacity>
      <Text>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity >
        <Text>Select Taxi Licence Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Select Carnet De Place PDF</Text>
      </TouchableOpacity>
      <Button title="Submit Application" onPress={handleSubmit} />
    </View>
  );
};

export default DriverApplicationScreen;
