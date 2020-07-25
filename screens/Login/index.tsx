import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';

import { Firebase } from '../../firebase';

const login = (inputEmail: string, inputPassword: string) => {
  Firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword);
};

export default function Login({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  return (
    <View style={styles.container}>
      <>
        <TextInput
          style={styles.inputBox}
          value={inputEmail}
          onChangeText={(email: string) => setInputEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.inputBox}
          value={inputPassword}
          onChangeText={(password: string) => setInputPassword(password)}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />
        <View style={styles.buttonWrap}>
          <Button
            title="Login"
            onPress={() => login(inputEmail, inputPassword)}
          >
            <Text>Login</Text>
          </Button>
        </View>
        <View style={styles.buttonWrap}>
          <Button
            title="SignUp"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    color: '#333',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttonWrap: {
    marginTop: 10,
  },
});
