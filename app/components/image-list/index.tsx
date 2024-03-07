import { useState } from 'react'
import { Image } from 'expo-image'
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import ImageView from "react-native-image-viewing";
import { ContainerST, ImgST, TextST } from './style';

type ImageListProps = {
    images: any;
    isVisible: boolean;
    closeModal: () => void;
}

export default function ImageList({ images, isVisible, closeModal }: ImageListProps) {

    const [visiblePreview, setVisiblePreview] = useState<boolean>(false)
    const [imageIndex, setImageIndex] = useState<number>(0)

    /**
     * Function to handle preview of an image.
     * 
     * @param {number} key - The index of the image to preview.
    */
    const handlerPreview = (key: number) => {
        setImageIndex(key);
        setVisiblePreview(true)
    }

    return (
        <>
            {/* Preview image */}
            <ImageView images={images} imageIndex={imageIndex} visible={visiblePreview} onRequestClose={() => setVisiblePreview(false)} />

            {/* Modal list images */}
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View style={ContainerST.modalContent}>
                    <View style={ContainerST.titleContainer}>
                        <Text style={TextST.title}>Lista de Imagenes</Text>
                        <Pressable onPress={closeModal}>
                            <FontAwesome name={"times"} size={25} color="#333" style={{ alignSelf: "center", marginTop: 7 }} />
                        </Pressable>
                    </View>
                    <View style={ContainerST.list}>
                        {
                            images.length > 0 &&
                            images.map((row: any, key: number) => (
                                <TouchableOpacity onPress={() => handlerPreview(key)} key={key}>
                                    <Image style={ImgST.image} placeholder={process.env.EXPO_PUBLIC_BLURHASH}
                                        contentFit="cover" transition={1000} source={{ uri: row.uri }} />
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </Modal>
        </>
    )
}