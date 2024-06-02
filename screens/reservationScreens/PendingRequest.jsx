import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { sendPushNotification } from '../../hooks/usePushNotifications';
import io from 'socket.io-client';
import { ReservationContext } from '../../context/ReservationContext';
import { UserContext } from '../../context/UserContext';
import { device1, device2 } from '../../expoPushTokens';
import { webSocketServerURL } from '../../localhostConfig';

const PendingRequest = ({ navigation, route }) => {
    const socket = io(webSocketServerURL);

    const { username, photo, selectedTaxiType, myPosition, destination, distance, price } = route.params;
    const [countdown, setCountdown] = useState(0);
    const [loadVisible, setLoadVisible] = useState(true);
    const [message, setMessage] = useState('Contacting the nearest driver');
    const [counter, setCounter] = useState(0);
    const [active, setActive] = useState(true);

    const { reservation, setReservation } = useContext(ReservationContext);
    const { user, setUser } = useContext(UserContext);

    const [status, setStatus] = useState('idle');
    const [driverUid, setDriverUid] = useState(null);
    // useEffect(() => {
    //     if(counter === 0){
    //     sendRequest();
    //     }
    // }, [counter]);

    useEffect(() => {
        setStatus(reservation.status);
        console.log('Status: ', status);
    }, [reservation.status]);

    const sendRequest = async () => {
        await socket.emit('clientRequest', { uid: user.uid, clientId: socket.id });
        console.log('Request sent');
        setReservation({ ...reservation, status: 'pending' });
        sendPushNotification(device1, 'Ride Request!', 'A new ride request has been made!', { username, photo, myPosition, destination, distance, price, selectedTaxiType });

    };
    socket.on('driverResponse', (response) => {
        setDriverUid(response.uid);
        console.log('Driver response:', response);
        if (response.accepted) {
            setLoadVisible(false);
            setReservation({ ...reservation, status: 'accepted' });
        } else if (!response.accepted) {
            setReservation({ ...reservation, status: 'rejected' });
        }
    });
    useEffect(() => {
        setStatus(reservation.status);
        if (status === 'accepted') {
            //setLoadVisible(false);
            setReservation({ ...reservation, status: 'idle' });
            setActive(false);
            navigation.navigate('DriverInfos', { driverUid });
        }
    }, [status]);


    useEffect(() => {

        const timer = setTimeout(() => {
            setCounter(counter + 1);
            if(counter < 2){
                setMessage(counter < 3 ? 'Contacting the nearest driver' : 'Contacting another one...');
                setCountdown(5);

            }else{
                setMessage(counter > 5 ? 'Sorry, we\'re doing our best' : 'Contacting the nearest driver');
                setCountdown(15);
            }
            if (active) {
                if(counter < 2) {
                    sendRequest();
                }
               
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
           
        socket.emit('cancelRequest', { clientId: user.uid });
            
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
    
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true; // Prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.title}>Request Expired</Text>
           
            <Modal
                visible={loadVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.container}>
                    <View style={styles.panel}>
                        <Text style={styles.panelText}>{message}</Text>
                        <Text style={styles.panelText}>Please wait...</Text>
                        <ActivityIndicator size="large" color="#FFDC1C" />
                        {/* <Text style={styles.panelText}> {countdown} seconds</Text> */}
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
            </View>
        </>
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
      
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
      },
});
