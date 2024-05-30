import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const ApplicationDetails = ({ navigation, route }) => {
  const { application } = route.params;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const {
    uid,
    username,
    fullName,
    email,
    phone,
    photo,
    dateEnvoie,
    cardIdNumber,
    nationalCardPicture,
    drivingLicencePicture,
    carnetDePlacePDF,
    taxiCode,
    brand,
    model,
    year,
    color,
    seats,
    carPaper,
    taxiPhoto,
  } = application;

  const handleImagePress = (uri) => {
    console.log('Image pressed:', uri); // Debug logging
    setSelectedImage(uri);
    setVisible(true);
  };
  function addDriver() {
   
    const endpoint = "http://192.168.0.119:3000/users";
    const user = {
      uid: uid,
      username: username,
      email: email,
      phone: phone,
      typeUser: 'driver',
      photo: 'https://picsum.photos/200/300',
      fullName: fullName,

      cardIdNumber: cardIdNumber,
      drivingLicencePicture: drivingLicencePicture,
      nationalCardPicture: nationalCardPicture,
      carnetDePlacePDF: carnetDePlacePDF,


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
  function addTaxi(){
    const endpoint = "http://192.168.0.119:3000/taxis";
    const taxi = {
      taxiCode: taxiCode,
      brand: brand,
      model: model,
      year: year,
      color: color,
      seats: seats,
      carPaper: carPaper,
      taxiPhoto: taxiPhoto,
      idDriver: uid,
    }
    options = {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(taxi),
    }
     fetch(endpoint, options).then(response => {
      if (response.ok) {
        console.log("Taxi added to database");
      }

    });
}
function removeApplication(){
  const endpoint = "http://192.168.0.119:3000/applications/"+uid;
  options = {
    method: 'DELETE',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',

    },
  }
  fetch(endpoint, options).then(response => {
    if (response.ok) {
      console.log("Application removed from database");
    }

  });

}
 function approveApplication(){
  addDriver();
  addTaxi();
  removeApplication();
  navigation.navigate('AdminDashboard');

 }
 
  return (
    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
       <Text style={styles.sectionTitle}>Driver Information</Text>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => handleImagePress(photo)}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </TouchableOpacity>
        <Card.Content>
          <Title>{fullName} ({username})</Title>
          <Paragraph>Email: {email}</Paragraph>
          <Paragraph>Phone: {phone}</Paragraph>
          <Paragraph>Date Sent: {new Date(dateEnvoie).toLocaleDateString()}</Paragraph>
          <Paragraph>Card ID Number: {cardIdNumber}</Paragraph>
        </Card.Content>
        
      <View style={styles.documentContainer}>
        <View style={styles.documentCard}>
          <Text>National Card</Text>
          <TouchableOpacity onPress={() => handleImagePress(nationalCardPicture)}>
            <Image source={{ uri: nationalCardPicture }} style={styles.document} />
          </TouchableOpacity>
        </View>
        <View style={styles.documentCard}>
          <Text>Driving License</Text>
          <TouchableOpacity onPress={() => handleImagePress(drivingLicencePicture)}>
            <Image source={{ uri: drivingLicencePicture }} style={styles.document} />
          </TouchableOpacity>
        </View>
      </View>
       
      </Card>

     
      <Text style={styles.sectionTitle}>Taxi Information</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>Licence Plate: {taxiCode}</Paragraph>
          <Paragraph>Brand: {brand}</Paragraph>
          <Paragraph>Model: {model}</Paragraph>
          <Paragraph>Year: {year}</Paragraph>
          <Paragraph>Color: {color}</Paragraph>
          <Paragraph>Seats: {seats}</Paragraph>
        </Card.Content>
        <View style={styles.documentContainer}>
        <View style={styles.documentCard}>
          <Text>Taxi Photo</Text>
          <TouchableOpacity onPress={() => handleImagePress(taxiPhoto)}>
            <Image source={{ uri: taxiPhoto }} style={styles.document}/>
          </TouchableOpacity>
        </View>
        <View style={styles.documentCard}>
          <Text>Car Paper</Text>
          <TouchableOpacity onPress={() => handleImagePress(carPaper)}>
            <Image source={require('../../images/pdff.png')} style={styles.document} />
          </TouchableOpacity>
        </View>
      </View>
      </Card>

      

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={()=>{}} style={styles.rejectButton}>Reject</Button>
        <Button mode="contained" onPress={()=>{
          addDriver();
          addTaxi();
        }} style={styles.acceptButton}>Approve</Button>
      </View>

      {selectedImage && (
        <Modal
          visible={visible}
          transparent={true}
          onRequestClose={() => setVisible(false)}
         
        >
    
            <TouchableOpacity style={styles.modalContainer} onPress={() => setVisible(false)}>
              <Image source={{ uri: selectedImage }} style={styles.fullImage} />
            </TouchableOpacity>
      
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  photo: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  documentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  documentCard: {
    alignItems: 'center',
  },
  document: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  }, 
  buttonContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rejectButton: {
    backgroundColor: 'red',
    width: '40%',
  },
  acceptButton: {
    backgroundColor: '#40C057',
    width: '40%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
 
  fullImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default ApplicationDetails;
