import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { pickPdf, pickImage } from '../components/common_functions';
import Icon from 'react-native-vector-icons/Ionicons';

const AddTaxiScreen = () => {
    const [licensePlate, setLicensePlate] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    const [seats, setSeats] = useState('');
    const [pdf, setPdf] = useState(null);
    const [taxiImage, setTaxiImage] = useState(null);

    const handleSignup = () => {
        // Handle signup process with the collected data
    };


    return (
        <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                

                <Text style={styles.label}>Licence Plate</Text>
                <TextInput
                    style={styles.input}
                    placeholder="License Plate"
                    value={licensePlate}
                    onChangeText={text => setLicensePlate(text)}
                />
                <Text style={styles.label}>Brand</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Brand"
                    value={brand}
                    onChangeText={text => setBrand(text)}
                />
                <Text style={styles.label}>Model</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Model"
                    value={model}
                    onChangeText={text => setModel(text)}
                />
                <Text style={styles.label}>Year</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Year"
                    value={year}
                    onChangeText={text => setYear(text)}
                />
                <Text style={styles.label}>Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Color"
                    value={color}
                    onChangeText={text => setColor(text)}
                />
                <Text style={styles.label}>Number of seats</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Number of Seats"
                    keyboardType="numeric"
                    value={seats}
                    onChangeText={text => setSeats(text)}
                />
               
                <View style={styles.infoPanel}>
                    <Text style={styles.note}>- Carte Grise</Text>
                    <Text style={styles.note}>- Assurance</Text>
                    <Text style={[styles.note, {paddingTop: 4, fontWeight: 'bold'}]} >NB: Regroup the docs in one file</Text>
                </View>
                <TouchableOpacity 
                 onPress={async() => {
                    const pdf = await pickPdf();
                    setPdf(pdf);
                  }} 
                style={styles.button}>
                    <Text style={styles.buttonText}>Upload PDF</Text>
                    <Image source={require('../images/pdf.png')} style={{ width: 22, height: 22 }} />
                </TouchableOpacity>
                {pdf && <Text style={styles.uploadedText}>PDF Uploaded: {pdf}</Text>}

                
                <TouchableOpacity 
                  onPress={async() => {
                    const img = await pickImage();  
                    setTaxiImage(img);
                }} 
                  style={styles.button}>
                  <Text style={styles.buttonText}>Upload Taxi Photo</Text>
                  <Icon name={'image'} size={20} color={'#000'} />
                </TouchableOpacity>
                {taxiImage && <Image source={{ uri: taxiImage }} style={styles.image} />}
                
                <TouchableOpacity onPress={handleSignup} style={[styles.button, { backgroundColor: '#FFDC1C', marginTop:30, borderBottomWidth: 0, justifyContent: 'center' }]}>
                    <Text style={styles.saveButtonText}>Send Application</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 20,
        paddingBottom: 10
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        marginBottom: 25,
        color: 'black',
        width: '100%',
        paddingHorizontal: 5
    },
    label: {
        fontSize: 14,
        alignSelf: 'flex-start',
        paddingHorizontal: 5
    },
    infoPanel:{
        alignSelf: 'flex-start',
        padding:10,
        backgroundColor: '#cef0b8',
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        borderColor: '#93C572',
        borderWidth: 2,
    },
    note: {
        fontSize: 13,
    },
    button: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
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
    saveButtonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    uploadedText: {
        marginBottom: 20,
        fontSize: 16,
        color: 'green',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 30,
        borderRadius: 8,
        
    },
};

export default AddTaxiScreen;
