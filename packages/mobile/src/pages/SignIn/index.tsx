import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Feather';

import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../contexts/auth';

const SignIn = () => {
  const [username, setUsername] = useState<string>('leonardo4');
  const [password, setPassword] = useState<string>('123456');

  const {signIn, signed, signOut} = useAuth();

  const navigation = useNavigation();

  function handleNavigateToHome() {
    navigation.navigate('Home');
  }

  async function handleSign() {
    signOut();
    if (username && password) {
      await signIn(username, password);
      console.log('as', signed);
      signed && handleNavigateToHome();
    } else {
      console.log(signed);
      console.log('incompleto');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        // eslint-disable-next-line react-native/no-inline-styles
        imageStyle={{width: 274, height: 368, opacity: 0.1}}>
        <View style={styles.main}>
          {/* <Image source={require('../../assets/logo.png')} /> */}
          <Text style={styles.title}>
            Denuncie aglomerações, faça sua parte
          </Text>
          <Text style={styles.description}>
            O virus se espalha mais rápido entre multidões, não deixe isso
            acontecer, proteja sua saúde e a de seus familiares. Denuncie.
          </Text>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <RectButton style={styles.button} onPress={handleSign}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 20,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu-Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
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
});

export default SignIn;
