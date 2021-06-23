import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {RectButton} from 'react-native-gesture-handler';

import RNFS from 'react-native-fs';

import ImagePiker from '../../components/ImagePiker';
import CircleProgress from '../../components/CircleProgress';

import {useAuth} from '../../contexts/auth';

/* interface Denunciation {
  id: number;
  description: string;
  image_url: string;
  latitude: number;
  longitude: number;
} */

interface Params {
  position: [number, number];
}

interface FileImage {
  name: string;
  type: string;
  uri: string;
}

const NewDenunciation = () => {
  const [image, setImage] = useState<FileImage>({
    name: '',
    type: '',
    uri: '',
  });
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [description, setDescription] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const {signOut} = useAuth();

  useEffect(() => {
    setPosition(routeParams.position);
  }, [routeParams.position]);

  async function getPathFile(uri: string, fileName: string) {
    const destPath = `${RNFS.ExternalDirectoryPath}/${fileName}`;
    await RNFS.copyFile(uri, destPath);
  }
  function upload() {
    let uploadUrl = 'http://192.168.0.103:3333/denunciations'; // For testing purposes, go to http://requestb.in/ and create your own link
    // create an array of objects of the files you want to upload
    getPathFile(image.uri, image.name);

    let files = [
      {
        name: 'file',
        filename: image.name,
        filepath: `${RNFS.ExternalDirectoryPath}/${image.name}`,
        filetype: image.type,
      },
    ];

    let uploadBegin = (response: any) => {
      let jobId = response.jobId;
      setSending(true);
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    let uploadProgress = async (response: any) => {
      let percentage = Math.floor(
        (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
      );
      setProgress(percentage);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };
    console.log(description);
    // upload files
    RNFS.uploadFiles({
      toUrl: uploadUrl,
      files: files,
      method: 'POST',
      headers: {
        Accept: 'application/json;charset=utf-8',
      },
      fields: {
        latitude: String(position[0]),
        longitude: String(position[1]),
        description: String(description),
      },
      begin: uploadBegin,
      progress: uploadProgress,
    })
      .promise.then(async (response: any) => {
        if (response.statusCode === 200) {
          setProgress(100);
          console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
          await new Promise((resolve) => setTimeout(resolve, 1000));
          handleNavigateToDenunciations(true);
        } else {
          console.log('SERVER ERROR');
        }
      })
      .catch((err) => {
        if (err.description === 'cancelled') {
          // cancelled by user
        }
        console.log(err);
      });
  }

  async function handleSubmitDenunciation() {
    try {
      upload();
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDenunciations(reload?: boolean) {
    if (reload) {
      return navigation.navigate('Denunciations', {reload});
    }
  }

  function handleSignOut() {
    signOut();
    navigation.navigate('SignIn');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            statusBarTranslucent={true}
            transparent={false}
            visible={sending}>
            <CircleProgress
              progress={progress}
              circleProgressColor="#f15a57"
              circleBackgroundColor="#00000025"
              TextColor="#00000045"
            />
          </Modal>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={20} color="#f15a57" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.userButton} onPress={handleSignOut}>
              <Icon name="unlock" size={20} color="#f15a57" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.title}>Nova denúncia</Text>
            <Text style={styles.description}>
              Envie uma foto se possível, confira a localização e descreva a
              situação.
            </Text>
          </View>
          <View style={styles.footer}>
            <ImagePiker onFileUploaded={setImage} />
            <View style={styles.mapContainer}>
              {position[0] !== 0 && (
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: position[0],
                    longitude: position[1],
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: position[0],
                      longitude: position[1],
                    }}
                  />
                </MapView>
              )}
            </View>
            <TextInput
              style={styles.textarea}
              placeholder="Informações adicionais"
              autoCorrect={false}
              multiline={true}
              numberOfLines={10}
              maxLength={600}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <RectButton
              style={styles.button}
              onPress={handleSubmitDenunciation}>
              <Text style={styles.buttonText}>Enviar denúncia</Text>
            </RectButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ohNo: {
    flex: 1,
    justifyContent: 'space-between',
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  textarea: {
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    padding: 24,
    fontSize: 16,
    textAlignVertical: 'top',
    overflow: 'scroll',
  },

  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Number(StatusBar.currentHeight),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 42,
    padding: 10,
    paddingLeft: 0,
  },

  userButton: {
    width: 42,
    padding: 10,
    paddingRight: 0,
    paddingLeft: 20,
  },

  button: {
    backgroundColor: '#f15a57',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    marginTop: 24,
    color: '#444',
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginVertical: 4,
    fontFamily: 'Roboto-Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  footer: {
    paddingVertical: 10,
  },
});

export default NewDenunciation;
