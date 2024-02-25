import { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera'
import ImageList from './components/image-list';
import OptionsPanel from './components/options-panel';
import { ContainerST, PressableST, TextST } from './style';

export default function App() {

  const { hasPermission, requestPermission } = useCameraPermission()
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState<any>({ volume: false, hdr: false, fps: 30, camType: 'back' })
  const device: any = useCameraDevice(config.camType, {})
  const format = useCameraFormat(device, [{ fps: config.fps }, { photoHdr: config.hdr }])
  const camera = useRef<any>(null)
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    async function getPermission() {
      if (!hasPermission) await requestPermission()
    }
    getPermission()
  }, [])

  /**
   * Function to take a photo using the camera.
   * 
   * @returns {Promise<void>} A Promise that resolves once the photo is taken.
  */
  const takePhoto = async () => {
    try {
      if (camera.current !== null) {
        setLoading(true)
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'speed',
          flash: 'off',
          enableShutterSound: config.volume
        })
        setImages([...images, { uri: `file://${photo.path}`, original: photo }])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  {/* If you don't have access to the camera */ }
  if (hasPermission === false) return <Text style={TextST.noAccess}>Sin acceso a la cámara</Text>

  return (
    <>
      <View style={ContainerST.mainView}>

        {/* Camera */}
        <Camera ref={camera} style={[StyleSheet.absoluteFill, { flex: 1 }]}
          enableZoomGesture={true}
          device={device} isActive={true}
          format={format} photo={true} enableHighQualityPhotos />

        {/* Options panel */}
        <OptionsPanel config={config}
          setFPS={() => setConfig({ ...config, fps: (config.fps === 30) ? 60 : 30 })}
          setHDR={() => setConfig({ ...config, hdr: !config.hdr })}
          switchCam={() => setConfig({ ...config, camType: (config.camType === 'back' ? 'front' : 'back') })}
          setVolume={() => setConfig({ ...config, volume: !config.volume })}
        />

        {/* Take photo button */}
        <View style={PressableST.takePhoto}>
          <Pressable onPress={takePhoto} style={[PressableST.takePhotoBtn, { backgroundColor: loading ? "red" : "gray" }]} disabled={loading}>
            <View style={PressableST.takePhotoBall}></View>
          </Pressable>
        </View>

        {/* Thumbnail images */}
        <TouchableOpacity style={ContainerST.miniatureTouch} onPress={() => setIsVisible(true)}>
          {
            images.length > 0 &&
            images.slice(-3).map((row: any, key: number) => (
              <Image key={key}
                style={[ContainerST.miniatureImage, {
                  left: [30, 20, 0][key],
                  opacity: [0.8, 0.8, 1][key],
                  rotation: [30, 20, 0][key]
                }]}
                placeholder={process.env.EXPO_PUBLIC_BLURHASH}
                contentFit="cover"
                transition={1000}
                source={{ uri: row.uri }}
              />
            ))
          }
          <Text style={ContainerST.miniatureBall}>{images.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal, image list */}
      {isVisible && <ImageList images={images.reverse()} isVisible={isVisible} closeModal={() => setIsVisible(false)} />}
    </>
  )
}