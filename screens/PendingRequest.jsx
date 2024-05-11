import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const PendingRequest = ({ route }) => {
    const { selectedTaxiType, myPosition, destination, price, priceVIP } = route.params;
    const [countdown, setCountdown] = useState(10);
    const [loadVisible, setLoadVisible] = useState(true);
    const [message, setMessage] = useState('Contacting the nearest driver');
    const [counter, setCounter] = useState(0);
    const navigation = useNavigation();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCounter(counter+1);
            setCountdown(10);
            setMessage(counter <= 3 ? 'Contacting another one...' : 'Sorry, we\'re doing our best');
        }, countdown * 1000);

        return () => clearTimeout(timer);
    }, [countdown, navigation]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1300);

        return () => clearInterval(interval);
    }, []);

    const cancelRequest = () => {
       
        setLoadVisible(false); 
        navigation.navigate('Location'); 
    };
    
    
     const fetchActiveDrivers = async() => {
        const endpoint = 'http://192.168.0.119:3000/active-driver';
        await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            //do something here..
        }
        )
     }

    return (
        <Modal
            visible={loadVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.panel}>
                    <Text style={styles.panelText}>{message}</Text>
                    <Text style={styles.panelText}>Please wait...</Text>
                    <Text style={styles.panelText}> {countdown} seconds</Text>
                    <Text style={{ paddingTop: 10 }}>{myPosition}</Text>
                    <Text>{destination}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{selectedTaxiType}</Text>
                    <Text style={{ fontWeight: 'bold', color: "#1bd719", padding: 10 }}>
                        {selectedTaxiType === 'Classic' ? price : priceVIP} DZD
                    </Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={cancelRequest}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default PendingRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    panel: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 300,
        height: 350,
    },
    panelText: {
        paddingTop: 5,
        fontSize: 18,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 10,
        marginTop: 50,
        paddingHorizontal: 20,
        paddingRight: 10,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: '#FFDC1C',
    },
    cancelButtonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
