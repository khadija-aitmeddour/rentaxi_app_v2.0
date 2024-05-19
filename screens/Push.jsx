import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync, sendPushNotification} from '../hooks/usePushNotifications';
import { useNavigation } from '@react-navigation/native';

export default function Push() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(undefined);
    const notificationListener = useRef();
    const responseListener = useRef();
    const navigation = useNavigation();
  
    useEffect(() => {
      registerForPushNotificationsAsync()
        .then(token => setExpoPushToken(token || ''))
        .catch(error => setExpoPushToken(error.message));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>Your Expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
       
         
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification("ExponentPushToken[VhhgZ8IrAoduMGLjc9NGxQ]", 'Ride Request!', 'A new ride request has been made!',{expoPushToken});
          }}
        />
      </View>
    );
  }
  