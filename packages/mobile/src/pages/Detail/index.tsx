import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import api from '../../services/api';

import Icon from 'react-native-vector-icons/Feather';

import {useAuth} from '../../contexts/auth';

interface Params {
  denunciation_id: number;
}

interface Data {
  image_url: string;
  latitude: number;
  longitude: number;
  description: string;
  created_at: Date;
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState<Data>({} as Data);

  const routeParams = route.params as Params;

  const {signOut} = useAuth();

  useEffect(() => {
    api.get(`denunciations/${routeParams.denunciation_id}`).then((response) => {
      setData(response.data);
    });
  }, [routeParams.denunciation_id]);

  function handleNavigateBack() {
    navigation.goBack();
  }

  if (!data.latitude) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#f15a57" />
      </View>
    );
  }

  function handleSignOut() {
    signOut();
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1, height: '100%', backgroundColor: '#F0F0F5'}}>
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
          Registro:&nbsp;
          {new Date(data.created_at).toLocaleString().substr(0, 10) +
            ' - ' +
            new Date(data.created_at).toLocaleTimeString().substr(0, 5)}
        </Text>
        <Image
          style={styles.denunciationImage}
          source={{uri: data.image_url}}
        />
        <View style={styles.mapContainer}>
          {Number(data.latitude) !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}>
              <Marker
                coordinate={{
                  latitude: Number(data.latitude),
                  longitude: Number(data.longitude),
                }}
              />
            </MapView>
          )}
        </View>
        <View style={styles.denunciationsContent}>
          <Text style={styles.denunciationsText}>{data.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
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

  denunciationImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
    marginTop: 24,
    color: '#444',
  },

  denunciationsContent: {
    flex: 1,
  },

  denunciationsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80',
    textAlign: 'justify',
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#99999980',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: '48%',
    backgroundColor: '#f15a57',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
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
});

export default Detail;
