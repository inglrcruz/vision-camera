import { StyleSheet } from 'react-native'

/**
 * Styles for font components.
 */
export const FontST = StyleSheet.create({ 
   main: {
    alignSelf: "center", 
    marginTop: 7
   }
})

/**
 * Styles for button components.
 */
export const ButtonST = StyleSheet.create({
    paressableaMain: {
        backgroundColor: "white",
        borderRadius: 8,
        width: 40,
        height: 40
    },
    paressablea: {
        backgroundColor: "white",
        borderRadius: 8,
        width: 40,
        height: 40,
        marginTop: 8
    },
})

/**
 * Styles for the container components.
 */
export const ContainerST = StyleSheet.create({
    mainPanel: {
        alignSelf: 'flex-start',
        position: 'absolute',
        borderRadius: 8,
        right: 10,
        top: 30,
        backgroundColor: "#e3e1df",
        padding: 8
    }
})