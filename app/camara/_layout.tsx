import { useCallback, useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera'
import ImageList from '../components/image-list';
import OptionsPanel from '../components/options-panel';
import { ContainerST, PressableST, TextST } from './style';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Reanimated, { Extrapolation, interpolate, runOnJS, useAnimatedProps, useSharedValue } from 'react-native-reanimated'

Reanimated.addWhitelistedNativeProps({
  zoom: true,
})
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

export default function CameraScreen() {

  const { hasPermission, requestPermission } = useCameraPermission()
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [config, setConfig] = useState<any>({ volume: false, hdr: false, fps: 30, camType: 'back' })
  const device: any = useCameraDevice(config.camType, {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })
  const format = useCameraFormat(device, [{ fps: config.fps }, { photoHdr: config.hdr }])
  const camera = useRef<any>(null)
  const [images, setImages] = useState<any[]>([])
  const [zoomStatus, setZoomStatus] = useState<number>(0)
  const zoom = useSharedValue(device.neutralZoom)
  const zoomOffset = useSharedValue(0)

  useEffect(() => {
    async function getPermission() {
      if (!hasPermission) await requestPermission()
    }
    getPermission()
  }, [])

  const focus = useCallback((level: number) => {
    setZoom(level)
  }, [])

  const animatedProps = useAnimatedProps<any>(() => ({ zoom: zoom.value }), [zoom])
  const gesture = Gesture.Pinch()
    .onBegin(() => zoomOffset.value = zoom.value)
    .onUpdate((event) => {
      const z = zoomOffset.value * event.scale
      zoom.value = interpolate(z, [1, 10], [device.minZoom, device.maxZoom], Extrapolation.CLAMP)
    })
    .onFinalize(() => runOnJS(focus)(zoom.value))

  /**
   * Sets the zoom value.
   *
   * @param val {number} The new zoom value.
   */
  const setZoom = (val: number) => {
    zoom.value = val
    const decimal = parseFloat(val.toFixed(3))
    const zoomLevel = (decimal >= 2) ? 2 : (decimal === 0.60) ? 0 : 1
    setZoomStatus(zoomLevel)
  }

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
      <GestureHandlerRootView style={ContainerST.mainView}>
        <GestureDetector gesture={gesture}>

          {/* Camera */}
          <ReanimatedCamera ref={camera} style={[StyleSheet.absoluteFill, { flex: 1 }]}
            enableZoomGesture={true}
            zoom={zoomStatus}
            animatedProps={animatedProps}
            device={device} isActive={true}
            format={format} photo={true} enableHighQualityPhotos />
        </GestureDetector>

        {/* Options panel */}
        <OptionsPanel config={config}
          setFPS={() => setConfig({ ...config, fps: (config.fps === 30) ? 60 : 30 })}
          setHDR={() => setConfig({ ...config, hdr: !config.hdr })}
          switchCam={() => setConfig({ ...config, camType: (config.camType === 'back' ? 'front' : 'back') })}
          setVolume={() => setConfig({ ...config, volume: !config.volume })}
        />

        {/* Take photo button */}
        <View style={PressableST.takePhoto}>

          <View style={PressableST.zoomMain}>
            <Pressable onPress={() => setZoom(1)} style={[PressableST.zoomBtn, { marginLeft: 5 }]}>
              <Text style={[PressableST.zoomTxt, { backgroundColor: (zoomStatus === 1) ? "#619df3" : "transparent" }]}>1x</Text>
            </Pressable>

            <Pressable onPress={() => setZoom(2)} style={[PressableST.zoomBtn, { marginLeft: 20 }]}>
              <Text style={[PressableST.zoomTxt, { backgroundColor: (zoomStatus === 2) ? "#619df3" : "transparent" }]}>2x</Text>
            </Pressable>
          </View>
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

        {/* Modal, image list */}
        {isVisible && <ImageList images={images.reverse()} isVisible={isVisible} closeModal={() => setIsVisible(false)} />}
      </GestureHandlerRootView>
    </>
  )
}