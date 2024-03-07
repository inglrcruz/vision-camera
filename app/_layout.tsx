import { Stack } from 'expo-router';
import { Alert, Platform, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import 'firebase/messaging'
import { useEffect, useRef } from 'react';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBSpPc3rLEiLjLsJNCBp9tCSnvj6Qr_iok",
    authDomain: "com.dodosoft.vision_camera",
    projectId: "vision-camara",
    storageBucket: "vision-camara.appspot.com",
}

initializeApp(firebaseConfig)

async function registerForPushNotificationsAsync() {

    let token: any;

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
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
            alert('Failed to get push token for push notification!');
            return;
        }

        token = await Notifications.getExpoPushTokenAsync({
            projectId: "8b075ca4-6929-46db-8e39-3e188c45b100"
        })

    } else {
        alert('Must use physical device for Push Notifications');
    }
    return token.data;
}

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'camara',
}

export default function RootLayoutNav() {

    const notificationListener = useRef<any>()
    const responseListener = useRef<any>()

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log(" Token ", token)
        });

        notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
            console.log(" Add ", notification)
        })

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response.notification);
        })

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        }
    }, [])

    const onPress = (text: string) => {
        Alert.alert("Button press", text)
    }

    return (
        <Stack>
            <Stack.Screen name="home" options={{
                headerShown: true,
                title: "PRODUCTION",
                headerTitleAlign: 'center',
                headerLeft: () =>
                    <Pressable onPress={() => onPress("Menu")}>
                        <FontAwesome6 size={20} color="#7b808c" name="bars" />
                    </Pressable>,
                headerRight: () =>
                    <Pressable onPress={() => onPress("Search")}>
                        <FontAwesome6 size={20} color="#7b808c" name="magnifying-glass" />
                    </Pressable>
            }} />
            <Stack.Screen name="camara" options={{ headerShown: false }} />
        </Stack>
    )
}