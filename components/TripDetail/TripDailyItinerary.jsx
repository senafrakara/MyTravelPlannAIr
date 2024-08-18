import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function TripDailyItinerary({ details }) {

    return details && (
        <View style={{
            marginTop: 20,
            gap: 10,
            borderWidth: 3,
            borderColor: Colors.LIGHT_GRAY,
            padding: 10,
            borderRadius: 15
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold'
            }}>⛵️ Plan Details</Text>

            <View style={{ gap: 15 }}>
                {details.map((item, index) => (
                    <View style={{
                        marginRight: 15,
                        gap: 5,
                        backgroundColor: Colors.LIGHT_GRAY,
                        padding: 5,
                        borderRadius: 8
                    }} >
                        <Text style={{
                            fontSize: 17,
                            fontFamily: 'outfit-bold',
                        }}>Day {item?.day} - {item?.title}</Text>

                        {item?.activities.map((activity, index) => (
                            <View style={{ marginLeft: 15, gap: 5 }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: 'outfit-bold'
                                }}>{activity?.name}</Text>
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'outfit-medium'
                                }}>⏱ {activity?.time} Duration: {activity?.duration}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: 'outfit-regular'
                                }}>➡{activity.description}</Text>
                            </View>
                        ))}

                    </View>
                ))}
            </View>
        </View >
    )
}