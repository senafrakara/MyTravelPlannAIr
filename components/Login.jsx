import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  //whenever you want to navigate from one screen to another screen,
  //you have to use useRouter hook.

  return (
    <View>
      <Image source={require('@/assets/images/login-page.png')}
        style={{
          width: '100%',
          height: 500
        }}
      />
      <View style={styles.container}>
        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 28,
          textAlign: 'center',
          marginTop: 10
        }}>
          My Travel PlannAIr
        </Text>
        <Text
          style={{
            fontFamily: 'outfit-regular',
            fontSize: 17,
            textAlign: 'center',
            color: Colors.GRAY,
            marginTop: 15,
          }}>
          Discover seamless travel planning powered by cutting-edge AI technology. Our application is
          designed to enhance every aspect of your journey, from itinerary creation to real-time recommendations, ensuring you make the most of your travels with ease.
        </Text>

        <TouchableOpacity style={styles.button}
          onPress={() => router.push('auth/sign-in')}
        >
          <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily: 'outfit-regular',
            fontSize: 17
          }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 25,
    height: '100%'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: '20%'
  }
});