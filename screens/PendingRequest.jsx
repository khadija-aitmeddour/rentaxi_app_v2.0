import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { sendPushNotification } from '../hooks/usePushNotifications';
import io from 'socket.io-client';
import { ReservationContext } from '../context/ReservationContext';

const PendingRequest = ({ navigation, route }) => {
    const socket = io('http://192.168.0.119:3001');
   
    const { username, photo, selectedTaxiType, myPosition, destination, distance, price } = route.params;
    const [countdown, setCountdown] = useState(10);
    const [loadVisible, setLoadVisible] = useState(true);
    const [message, setMessage] = useState('Contacting the nearest driver');
    const [counter, setCounter] = useState(0);

    const { reservation, setReservation } = useContext(ReservationContext);
    const [status, setStatus] = useState(reservation.status);

    useEffect(() => {
        setStatus(reservation.status);
        console.log('Status: ', status);
    }, [status, reservation.status]);

    const sendRequest = () => {
        socket.emit('clientRequest', { clientId: socket.id });
        console.log('Request sent');
        setReservation({ ...reservation, status: 'pending' });
        sendPushNotification("ExponentPushToken[sLglZIFI0brGRkTQK018jd]", 'Ride Request!', 'A new ride request has been made!', { username, photo, myPosition, destination, distance, price });

    };
    socket.on('driverResponse', (response) => {
        console.log(response);
        if (response.accepted) {
            setLoadVisible(false);
            setReservation({ ...reservation, status: 'accepted' });
        }
    });
    useEffect(() => {
        if (status === 'accepted') {
            setLoadVisible(false);
        }
    }, [status]);


    useEffect(() => {
        
        const timer = setTimeout(() => {
            setCounter(counter + 1);
            setCountdown(10);
            setMessage(counter <= 3 ? 'Contacting another one...' : 'Sorry, we\'re doing our best');
            if(status !== 'accepted'){
                sendRequest();
            }
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


    const fetchActiveDrivers = async () => {
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
                        {price} DZD
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
