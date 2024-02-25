import { StyleSheet } from 'react-native'

/**
 * Styles for pressable components.
 */
export const PressableST = StyleSheet.create({
    takePhoto: {
        padding: 20,
        alignSelf: 'center',
        top: "80%"
    },
    takePhotoBtn: {
        backgroundColor: "#e3e1df",
        borderRadius: 50,
        padding: 10,
        width: 90,
        height: 90
    },
    takePhotoBall: {
        backgroundColor: "#f9f9f9",
        borderRadius: 50,
        padding: 10,
        width: 70,
        height: 70
    },
})

/**
 * Styles for the container components.
 */
export const ContainerST = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    miniatureTouch: {
        alignSelf: 'flex-start',
        bottom: 40,
        left: 20,
        position: 'absolute',
        width: 95,
        height: 100
    },
    miniatureImage: {
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        bottom: 10,
        width: 50,
        height: 80,
        backgroundColor: 'whie',
        position: 'absolute',
    },
    miniatureBall: {
        backgroundColor: "white",
        width: 25,
        height: 25,
        padding: 4,
        fontSize: 13,
        fontWeight: 'bold',
        borderRadius: 50,
        textAlign: 'center',
        marginLeft: -6,
        position: 'absolute',
        bottom: 0
    }
})

/**
 * Styles for text components.
 */
export const TextST = StyleSheet.create({
    noAccess: {
        display: "flex",
        alignSelf: "center",
        marginTop: "30%",
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
    },
})
