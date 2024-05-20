// import React, { useState, useEffect, useRef } from 'react';
// import * as Notifications from 'expo-notifications';
// import {registerForPushNotificationsAsync, sendPushNotification} from '../hooks/usePushNotifications';
// import { useNavigation } from '@react-navigation/native';

// export default function Push() {
//     const [expoPushToken, setExpoPushToken] = useState('');
//     const [notification, setNotification] = useState(undefined);
//     const notificationListener = useRef();
//     const responseListener = useRef();
//     const navigation = useNavigation();
  
//     useEffect(() => {
//       registerForPushNotificationsAsync()
//         .then(token => setExpoPushToken(token || ''))
//         .catch(error => setExpoPushToken(error.message));
  
//       notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//         setNotification(notification);
//       });
  
//       responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//         const {reservationDetails} = response.notification.request.content.data;
//         console.log('reservationDetails', reservationDetails)
//         navigation.navigate('ReservationDetails', { reservationDetails});
//       });
  
//       return () => {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//         Notifications.removeNotificationSubscription(responseListener.current);
//       };
//     }, []);
  
    
//   }
  