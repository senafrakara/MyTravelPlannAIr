import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, Pressable, AlertIOS, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../../configs/FbConf"
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfile } from 'firebase/auth';


export default function SignUp() {

  const navigation = useNavigation();
  const router = useRouter();

  const [firebaseUser, setFirebaseUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullname, setFullname] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email'),
    fullname: yup
      .string(),
    password: yup
      .string()
      .min(8, 'Password must contain at least 8 characters'),
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
      fullname: '',
    },
  });

  const onCreateAccount = (formData) => {
    const email = formData.email;
    const password = formData.password;
    const fullname = formData.fullName;

    if (!email && !password && !fullname) {
      if (Platform.OS == 'android') {
        ToastAndroid.show("Please Enter All Details!", ToastAndroid.LONG);
      } else {
        AlertIOS.alert("Please Enter All Details!");
      }
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        try {
          await auth.currentUser.reload();

          if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: fullname });

            await auth.currentUser.reload();

            console.log("🚀 ~ Updated auth.currentUser:", auth.currentUser);

            router.replace('/myTrip');
          } else {
            console.error("No current user available.");
          }
        } catch (error) {
          console.error("🚀 ~ onCreateAccount ~ error:", error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("🚀 ~ onCreateAccount ~ errorCode:", errorCode);
        console.error("🚀 ~ onCreateAccount ~ errorMessage:", errorMessage);
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
              placeholder="Full Name"

            />
          )}
          name="fullname"
        />
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

      <Pressable style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        marginTop: 50
      }}
        onPress={handleSubmit(onCreateAccount)}
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
  container: {
    padding: 16,
    marginTop: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY
  },
});
