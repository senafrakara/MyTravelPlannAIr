import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, Pressable, AlertIOS, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../../configs/FbConf"


export default function SignUp() {

  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullname, setFullname] = useState();
  console.log("🚀 ~ auth:", auth)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  const onCreateAccount = () => {

    if (!email && !password && !fullname) {
      if (Platform.OS == 'android') {
        ToastAndroid.show("Please Enter All Details!", ToastAndroid.LONG);
      } else {
        AlertIOS.alert("Please Enter All Details!");
      }
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("🚀 ~ .then ~ user:", user);
        router.replace('/myTrip');

      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("🚀 ~ onCreateAccount ~ errorCode:", errorCode)
        const errorMessage = error.message;
        console.log("🚀 ~ onCreateAccount ~ errorMessage:", errorMessage)
      });
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: 40,
      backgroundColor: Colors.WHITE,
      height: '100%',
    }}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={32} color="black" />
      </Pressable>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30
      }}>Create New Account</Text>

      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          onChangeText={(value) => setFullname(value)}
        >
        </TextInput>
      </View>

      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          onChangeText={(value) => setEmail(value)}
        >
        </TextInput>
      </View>

      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Enter Password'
          onChangeText={(value) => setPassword(value)}
        >
        </TextInput>
      </View>

      <Pressable style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 50
      }}
        onPress={onCreateAccount}
      >
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center'
        }}>Create Account</Text>
      </Pressable>

      <Pressable style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1
      }}
        onPress={() => router.replace('auth/sign-in')}>
        <Text style={{
          color: Colors.PRIMARY,
          textAlign: 'center'
        }}>Sign In</Text>
      </Pressable>

    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY
  }
});