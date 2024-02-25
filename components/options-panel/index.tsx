import { Pressable, View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { ContainerST, ButtonST, FontST } from './style';

type ImageListProps = {
    config: any;
    setFPS: () => void;
    setHDR: () => void;
    switchCam: () => void;
    setVolume: () => void;
}

export default function OptionsPanel({ config, setVolume, switchCam, setHDR, setFPS }: ImageListProps) {

    return (
        <View style={ContainerST.mainPanel}>
            <Pressable onPress={switchCam} style={ButtonST.paressableaMain}>
                <FontAwesome name={"refresh"} size={25} color="#333" style={FontST.main} />
            </Pressable>

            <Pressable onPress={setVolume} style={ButtonST.paressablea}>
                <FontAwesome name={(!config.volume) ? "volume-off" : "volume-up"} size={25} color="#333" style={FontST.main} />
            </Pressable>

            <Pressable onPress={setFPS} style={ButtonST.paressablea}>
                <Text style={{ fontWeight: "bold", textAlign: 'center', marginTop: 2, color: (config.fps === 30) ? "#333" : "#ecec53" }}>60 FPS</Text>
            </Pressable>

            <Pressable onPress={setHDR} style={ButtonST.paressablea}>
                <Text style={{ fontWeight: "bold", textAlign: 'center', marginTop: 10, color: (!config.hdr) ? "#333" : "#ecec53" }}>HDR</Text>
            </Pressable>
        </View>
    )
}