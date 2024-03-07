import { Stack } from 'expo-router';
import { Alert, Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'camara',
}

export default function RootLayoutNav() {

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