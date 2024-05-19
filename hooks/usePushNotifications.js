import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to send a push notification
async function sendPushNotification(expoPushToken, title, body, reservationDetails) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { reservationDetails },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(response => {
    if (response.ok) {
      console.log('Successfully sent push notification');
    } else {
      console.error('Failed to send push notification');
    }
  }).catch(error => { console.error('Failed to send push notification:', error) } );
}


// Function to handle registration errors
function handleRegistrationError(errorMessage) {
  Alert.alert('Registration Error', errorMessage);
  throw new Error(errorMessage);
}

// Function to register for push notifications
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }

    const projectId = Constants.expoConfig.extra?.eas?.projectId || Constants.expoConfig.extra?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }

    try {
      const { data: pushTokenString } = await Notifications.getExpoPushTokenAsync({ projectId });
      console.log(pushTokenString);
      return pushTokenString;
    } catch (error) {
      handleRegistrationError(error.message);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export { sendPushNotification, registerForPushNotificationsAsync }