import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const PendingRequest = ({ route }) => {
    const { selectedTaxiType, myPosition, destination, price, priceVIP } = route.params;
    const [countdown, setCountdown] = useState(5);
    const [loadVisible, setLoadVisible] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
           
           
        }, countdown * 10000);

        return () => clearTimeout(timer);
    }, [countdown, navigation]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const cancelRequest = () => {
       
        setLoadVisible(false); 
        navigation.navigate('Location'); 
    };

    return (
        <Modal
            visible={loadVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.panel}>
                    <Text style={styles.panelText}>Contacting the nearest driver</Text>
                    <Text style={styles.panelText}>Please wait...</Text>
                    <Text style={styles.panelText}>Canceling in {countdown} seconds</Text>
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
