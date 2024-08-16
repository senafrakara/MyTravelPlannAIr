import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment/moment';
import { Colors } from '../../constants/Colors';

export default function TripItemCard({ item }) {
    return (
        <View>
            <Image source={require('./../../assets/images/login-page.png')}
                style={{
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                    borderRadius: 15
                }}
            />
            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 24
                }}>{item.tripPlan.tripName} </Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 20

                }}>
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

                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 20

                }}>
                    <Text style={{
                        fontSize: 17,
                        fontFamily: 'outfit-regular',
                        color: Colors.GRAY
                    }}>
                        🚌 {item.tripData.traveler.title}
                    </Text>
                </View>

                <TouchableOpacity style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 15,
                    borderRadius: 15,
                    marginTop: 10
                }} >
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: 'center',
                        fontFamily: 'outfit-medium',
                        fontSize: 15
                    }}>
                        See Your Plan
                    </Text>

                </TouchableOpacity>

            </View>
        </View>
    )
}