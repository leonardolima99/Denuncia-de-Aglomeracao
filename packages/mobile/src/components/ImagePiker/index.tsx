/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* import React, {useState, useEffect} from 'react'; */
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  /* PermissionsAndroid, */
} from 'react-native';

interface Props {
  onFileUploaded: Function;
}

interface File {
  name: string;
  type: string;
  uri: string;
}

const ImagePiker: React.FC<Props> = ({onFileUploaded}) => {
  const [image, setImage] = useState<File>({
    name: '',
    type: '',
    uri: '',
  });
  /* useEffect(() => {
    (async () => {
      try {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (status !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'O aplicativo precisa da permissão',
            'Sem permitir o uso da câmera, você não poderá enviar uma foto.',
          );
        }
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []); */

  const camera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 720,
        maxHeight: 720,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setImage({
            name: response.fileName,
            type: response.type,
            uri: response.uri,
          });
          onFileUploaded({
            name: response.fileName,
            type: response.type,
            uri: response.uri,
          });
        }
      },
    );
  };

  return (
    <>
      <TouchableOpacity onPress={camera}>
        {image.uri ? (
          <Image source={{uri: image.uri}} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text style={styles.text}>Tire uma foto.</Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 10,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#f15a57de',
    backgroundColor: '#f15a5716',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    color: '#6C6C80',
  },
});

export default ImagePiker;
