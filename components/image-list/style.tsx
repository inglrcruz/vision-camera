import { StyleSheet } from 'react-native'

/**
 * Styles for text components.
 */
export const TextST = StyleSheet.create({
    title: {
        color: '#333',
        fontSize: 16,
    },
})

/**
 * Styles for images components.
 */
export const ImgST = StyleSheet.create({
    image: {
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'white',
        width: 87,
        height: 80
    },
})

/**
 * Styles for the container components.
 */
export const ContainerST = StyleSheet.create({
    modalContent: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "#e3e1df"
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    }
})