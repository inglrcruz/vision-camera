import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { useState } from 'react';
import { router } from "expo-router";

const styles = StyleSheet.create({

  shadow: {
    shadowColor: '#838383',
    elevation: 20
  },

  OptionBTN: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#4e81ee'
  },

  line: {
    padding: 5,
    backgroundColor: "#fff",
    width: 10,
    height: "100%",
    borderRadius: 10,
    marginRight: 4,
    marginLeft: 10
  },

  textSmall: {
    fontSize: 11,
    color: "#4d5560"
  },
  tapText: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#4e81ee',
    fontWeight: 'bold',
    borderBottomColor: "#4e81ee"
  },
  smallBtn: {
    backgroundColor: '#677389',
    padding: 10,
    borderRadius: 30,
    width: 45,
    height: 45,
    alignItems: 'center'
  },
  bigBtn: {
    backgroundColor: '#4e81ee',
    padding: 20,
    borderRadius: 50,
    width: 60,
    marginTop: -10
  },
  blackLine: {
    backgroundColor: '#000',
    padding: 2,
    alignSelf: 'center',
    width: 165,
    borderRadius: 10,
    marginTop: 15
  }
});

export default function App() {

  const [tap, setTap] = useState<string>('Media')

  const onPress = (text: string) => {
    Alert.alert("Button press", text)
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        {/* Top */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          {/* LINE */}
          <View style={[styles.shadow, styles.line]}></View><View>

            {/* Text */}
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <FontAwesome6 size={20} color="#4e81ee" name="arrow-left" style={{ marginTop: 25, marginLeft: 10 }} />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', color: "#4d5560" }}>Nancy TEST Roofing</Text>
                <Text style={styles.textSmall}>SE240066</Text>
                <Text style={styles.textSmall}>123 MAIN ST USAVILLE PA 12345</Text>
                <Text style={styles.textSmall}>Ready for Production</Text>
              </View>
            </View>

            {/* OPTIONS BTN */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => onPress('CONTACT')}>
                <View style={styles.OptionBTN}>
                  <FontAwesome6 size={15} color="#fff" name="user-large" />
                  <Text style={{ color: '#fff', marginTop: 5, fontSize: 10 }}>CONTACT</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress('DIRECTIONS')}>
                <View style={styles.OptionBTN}>
                  <FontAwesome6 size={15} color="#fff" name="diamond-turn-right" />
                  <Text style={{ color: '#fff', marginTop: 5, fontSize: 10 }}>DIRECTIONS</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress('CHECK IN')}>
                <View style={styles.OptionBTN}>
                  <FontAwesome6 size={15} color="#fff" name="location-dot" />
                  <Text style={{ color: '#fff', marginTop: 5, fontSize: 10 }}>CHECK IN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress('CLOSE OUT')}>
                <View style={styles.OptionBTN}>
                  <FontAwesome6 size={15} color="#fff" name="check-double" />
                  <Text style={{ color: '#fff', marginTop: 5, fontSize: 10 }}>CLOSE OUT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Nav options */}
        <View style={{ flexDirection: 'row', margin: 10, marginTop: 10, justifyContent: 'space-between', borderBottomWidth: 1.5, borderBottomColor: "#e7e8eb" }}>
          {["Media", "Documents", "Punch list", "Crews"].map((val: string, key: number) =>
            <TouchableOpacity key={key} onPress={() => setTap(val)}>
              <Text style={[styles.tapText, { borderBottomWidth: (tap === val) ? 1.5 : 0 }]}>{val}</Text>
            </TouchableOpacity>)}
        </View>

        <View style={{ borderBottomColor: "#e5e6ea", borderBottomWidth: 1.5, height: "50%", marginBottom: 10 }}>

          {/* MEDIA OPTIONS */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
            <View>
              <Text style={{ color: "#555d68", fontSize: 16 }}><FontAwesome6 size={15} color="#555d68" name="images" style={{ marginTop: 5 }} /> {tap}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100, paddingRight: 30 }}>
              <TouchableOpacity onPress={() => onPress('Share')}>
                <FontAwesome6 size={15} color="#4e81ee" name="share-nodes" style={{ marginTop: 5 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress('Arrow Up')}>
                <FontAwesome6 size={15} color="#4e81ee" name="arrow-up-from-bracket" style={{ marginTop: 5 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* IMAGES */}
          {
            tap === "Media" &&
            <View style={{ flexDirection: 'row', margin: 10 }}>
              {["", ""].map((val: string, key: number) =>
                <View key={key} style={{ backgroundColor: 'gray', width: '48%', height: 200, margin: 5, borderRadius: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <TouchableOpacity onPress={() => onPress('Star')}>
                      <FontAwesome6 size={20} color="#e1b63f" name="star" style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPress('Mini camera')}>
                      <View style={{ backgroundColor: "#4e81ee", padding: 5, borderRadius: 5, marginTop: 10 }}>
                        <FontAwesome6 size={15} color="#fff" name="camera" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ backgroundColor: "#4aa2e2", padding: 5, position: 'absolute', bottom: 5, right: 5, borderRadius: 8 }}>
                    <Text style={{ fontSize: 11, color: "#fff" }}>Pre-Production Picture</Text>
                  </View>
                </View>)}
            </View>
          }

        </View>

        {/* FOOTER */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 165, alignSelf: 'center', marginTop: -30 }}>

          <TouchableOpacity onPress={() => onPress('Folder')}>
            <View style={styles.smallBtn}>
              <FontAwesome6 size={15} color="#fff" name="folder" style={{ marginTop: 5 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push({ pathname: "/camara" })}>
            <View style={styles.bigBtn}>
              <FontAwesome6 size={20} color="#fff" name="camera" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress('Pen')}>
            <View style={styles.smallBtn}>
              <FontAwesome6 size={15} color="#fff" name="pen" style={{ marginTop: 5 }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* LINE BLACK */}
        <View style={styles.blackLine}></View>

      </View>
    </>
  )
}