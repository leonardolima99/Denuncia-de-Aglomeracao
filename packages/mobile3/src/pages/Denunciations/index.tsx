import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';

import api from '../../services/api';
import {RectButton} from 'react-native-gesture-handler';

import Geolocation from 'react-native-geolocation-service';

import {useAuth} from '../../contexts/auth';

type Denunciation = {
  id: number;
  description: string;
  image_url: string;
  latitude: number; // 15 casas decimais, corrigir no backend
  longitude: number;
  created_at: Date;
};

const Denunciations = () => {
  const [denunciations, setDenunciations] = useState<Denunciation[]>([]);
  console.log('Tipo state', typeof denunciations);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigation = useNavigation();
  const [load, setLoad] = useState(true);

  const {signOut} = useAuth();

  useEffect(() => {
    (async () => {
      await requestLocationPermission();

      if (checkPermission('ACCESS_FINE_LOCATION')) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setInitialPosition([
              position.coords.latitude,
              position.coords.longitude,
            ]);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            timeout: 15000,
            maximumAge: 10000,
            accuracy: 'balanced' as any,
            distanceFilter: 0,
          },
        );
      } else {
        Alert.alert(
          'Denúncia de Aglomerações precisa da sua permissão',
          'Sem sua permissão para acessar a localização não será possível carregar o mapa.',
        );
      }
    })();
  }, []);

  useEffect(() => {
    setSelectedPosition([0, 0]);
    api.get('denunciations').then((response) => {
      setDenunciations(response.data);
    });
    navigation.addListener('focus', () => setLoad(!load));
  }, [load, navigation]);

  function checkPermission(permission: string) {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[permission]);
  }

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleMapPress(e: any) {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setSelectedPosition([latitude, longitude]);
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', {denunciation_id: id});
  }

  function handleNavigateToNewDenunciation() {
    if (!selectedPosition[0]) {
      navigation.navigate('BackToMap');
      return;
    }

    navigation.navigate('NewDenunciation', {
      position: selectedPosition,
    });
  }

  function handleSignOut() {
    signOut();
    navigation.navigate('SignIn');
  }

  return (
    <>
      <View style={styles.container}>
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
        <Text style={styles.title}>
          Bem vindo. {denunciations.length} denúncias
        </Text>
        <Text style={styles.description}>
          Para fazer uma denúncia, marque o local no mapa e toque em [Nova
          denúncia].
        </Text>
        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
              onPress={(e) => handleMapPress(e)}>
              {denunciations.map((denunciation) => (
                <Marker
                  key={String(denunciation.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(denunciation.id)}
                  coordinate={{
                    latitude: Number(denunciation.latitude),
                    longitude: Number(denunciation.longitude),
                  }}>
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{uri: denunciation.image_url}}
                    />
                    <Text style={styles.mapMarkerTitle}>
                      {new Date(denunciation.created_at)
                        .toLocaleString()
                        .substr(0, 10)}
                      &nbsp;
                      {new Date(denunciation.created_at)
                        .toLocaleTimeString()
                        .substr(0, 5)}
                    </Text>
                  </View>
                </Marker>
              ))}
              <Marker
                coordinate={{
                  latitude: selectedPosition[0],
                  longitude: selectedPosition[1],
                }}
              />
            </MapView>
          ) : (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="#f15a57" />
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <RectButton
            style={styles.button}
            onPress={handleNavigateToNewDenunciation}>
            <Text style={styles.buttonText}>Nova denúncia</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Number(StatusBar.currentHeight),
    paddingBottom: 20,
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
    marginTop: 4,
    fontFamily: 'Roboto-Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 100,
    height: 100,
  },

  mapMarkerContainer: {
    width: 100,
    height: 90,
    backgroundColor: '#f15a57',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 100,
    height: 50,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: '#FFF',
    fontSize: 13,
    padding: 1,
    textAlign: 'center',
  },

  footer: {},
});

export default Denunciations;
