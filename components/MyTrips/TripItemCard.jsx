import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment/moment';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants'

export default function TripItemCard({ item }) {
    const router = useRouter();


    return (item &&
        <View style={{ marginTop: 20 }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 22,
            }}>{item.tripPlan.tripName} </Text>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 10,
                marginTop: 5
            }}>
                {item.tripData.locationInfo.photoRef &&
                    <Image source={{
                        uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + item.tripData.locationInfo.photoRef +
                            "&key=" + Constants?.expoConfig?.extra?.GOOGLE_MAPS_API_KEY
                    }}
                        style={{
                            width: 150,
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: 15,
                        }}
                    />}

                <View style={{
                    gap: 10,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'outfit-regular'
                        }}>
                            {item.tripPlan.destination}
                        </Text>

                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'outfit-regular',
                            color: Colors.GRAY
                        }}>
                            {moment(item.tripData.startDate).format('DD MMM yyyy')}
                        </Text>

                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'outfit-regular',
                            color: Colors.GRAY
                        }}>
                            🚌 {item.tripData.traveler.title}
                        </Text>

                    </View>

                    <TouchableOpacity style={{
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                    }}
                        onPress={() => router.push({
                            pathname: '/trip-details', params: {
                                trip: JSON.stringify(item)
                            }
                        })}>
                        <Text style={{
                            color: Colors.PRIMARY,
                            fontFamily: 'outfit-medium',
                            fontSize: 17,
                            textDecorationLine: 'underline'
                        }}>
                            SEE YOUR PLAN
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}