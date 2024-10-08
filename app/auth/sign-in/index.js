import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, AlertIOS, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "./../../../configs/FbConf"
import { signInWithEmailAndPassword } from "firebase/auth";
import { INVALID_CREDENTIAL_ERROR } from "./../../../helpers/FirebaseConstants";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);
  //if you dont give empty array, it executes infinite time
  //but if you give empty array, it executes once.


  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email'),
    password: yup
      .string()
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignIn = (formData) => {
    console.log("🚀 ~ onSignIn ~ formData:", formData)
    const email = formData.email;
    const password = formData.password;
    if (!email && !password) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Email and Password!", ToastAndroid.LONG);
      } else {
        AlertIOS.alert("Please Enter Email and Password!");
      }
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("🚀 ~ .then ~ user:", user);

        router.replace('/myTrip');

      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("🚀 ~ SignIn ~ errorCode:", errorCode);
        const errorMessage = error.message;
        console.log("🚀 ~ SignIn ~ errorMessage:", errorMessage);

        if (errorCode === INVALID_CREDENTIAL_ERROR) {
          if (Platform.OS === 'android') {
            ToastAndroid.show("Please Enter Email and Password Correctly!", ToastAndroid.LONG);
          } else {
            AlertIOS.alert("Please Enter Email and Password Correctly!");
          }
        }
      })
  };

  return (
    <View style={{
      padding: 25,
      backgroundColor: Colors.WHITE,
      height: '100%',
      paddingTop: 40
    }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={32} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          marginTop: 30
        }}>
        Let's Sign In
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          color: Colors.GRAY,
          marginTop: 20
        }}>
        Welcome Back
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          color: Colors.GRAY,
          marginTop: 10
        }}>
        You've Been Missed!
      </Text>

      <View style={{ marginTop: 20 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}
      </View>

      <View style={{ marginTop: 20 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>
      <TouchableOpacity style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 35
      }}
        onPress={handleSubmit(onSignIn)}                >
        <Text style={{
          color: Colors.WHITE,
          textAlign: 'center',
          fontFamily: 'outfit-regular',
          fontSize: 17
        }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1
      }}
        onPress={() => router.replace('auth/sign-up')}>
        <Text style={{
          color: Colors.PRIMARY,
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>

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