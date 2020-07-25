import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../types';

import { Firebase, db } from '../../firebase';

export default function Login({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response: firebase.auth.UserCredential = await Firebase.auth().createUserWithEmailAndPassword(
        inputEmail,
        inputPassword
      );
      if (response.user) {
        const user = {
          uid: response.user.uid,
          name: inputName,
          email: inputEmail,
        };
        db.collection('users').doc(response.user.uid).set(user);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={inputName}
        onChangeText={(name: string) => setInputName(name)}
        placeholder="Name"
        autoCapitalize="none"
        placeholderTextColor="#ccc"
      />
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
        secureTextEntry={true}
        placeholderTextColor="#ccc"
      />

      <View style={styles.buttonWrap}>
        <Button title="SignUp" onPress={handleSignUp} />
      </View>
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
