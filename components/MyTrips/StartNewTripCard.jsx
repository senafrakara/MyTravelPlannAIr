import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './../../constants/Colors'
import { useRouter } from 'expo-router'

export default function StartNewTripCard() {
    const router = useRouter();

    return (
        <View style={{
            padding: 20,
            marginTop: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 25
        }}>
            <Ionicons name="location" size={30} color="black" />
            <Text style={{
                fontSize: 25,
                fontFamily: 'outfit-medium',
            }}>
                No Trips Planned Yet
            </Text>

            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit',
                textAlign: 'center',
                color: Colors.GRAY
            }}>
                Looks like its time to plan a new travel experience!
                Get started below
            </Text>

            <TouchableOpacity style={{
                padding: 15,
                paddingHorizontal: 30,
                borderWidth: 2,
                borderColor: Colors.PRIMARY,
                borderRadius: 15,
            }}
                onPress={() => router.push('/create-trip/search-place')}
            >
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                    color: Colors.PRIMARY,
                    textAlign: 'center',
                }}>
                    Start a New Trip
                </Text>
            </TouchableOpacity>
        </View>
    )
}