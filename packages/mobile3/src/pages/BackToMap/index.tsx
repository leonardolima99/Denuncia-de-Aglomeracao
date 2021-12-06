import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';

import {RectButton} from 'react-native-gesture-handler';

import {useAuth} from '../../contexts/auth';

const BackToMap = () => {
  const navigation = useNavigation();

  const {signOut} = useAuth();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDenunciations() {
    navigation.navigate('Denunciations');
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
        <View style={styles.ohNo}>
          <View>
            <Text style={styles.title}>
              Você deve marcar uma posição no mapa primeiro.
            </Text>
          </View>

          <RectButton
            style={styles.button}
            onPress={handleNavigateToDenunciations}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-left" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Voltar para o mapa</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ohNo: {
    flex: 1,
    justifyContent: 'space-between',
  },

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

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
});

export default BackToMap;
