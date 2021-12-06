import React, {useState, useEffect, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  auth: boolean;
  level: number;
}

interface Response {
  data: {
    token: string;
    auth: boolean;
    level: number;
  };
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        let storageUser = false;
        AsyncStorage.getItem('@DenunAglom:user').then((response) => {
          if (response) {
            storageUser = true;
            setUser(JSON.parse(response));
          } else {
            console.log('Não logado.');
          }
        });
        const storageToken = await AsyncStorage.getItem('@DenunAglom:token');

        if (storageToken && storageUser) {
          /* console.log('parse', user); */
          api.defaults.headers.authorization = `Bearer ${storageToken}`;
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadStorageData();
  });

  async function signIn(username: string, password: string) {
    try {
      const response = await auth.signIn(username, password);

      api.defaults.headers.authorization = `Bearer ${response.token}`;

      await AsyncStorage.setItem(
        '@DenunAglom:user',
        JSON.stringify({
          auth: response.auth,
          level: response.level,
        }),
      );
      await AsyncStorage.setItem('@DenunAglom:token', response.token);
    } catch (error) {
      console.log(error.response.error);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await AsyncStorage.removeItem('DenunAglom:user');
      await AsyncStorage.removeItem('DenunAglom:token');
    } catch (error) {
      console.log('merda: ', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{signed: true, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, useAuth};
