import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import moment from 'moment'

export default function UserTripList({ userTrips }) {

    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                <FlatList
                    data={userTrips}
                    renderItem={({ trip, index }) => (
                        <View>
                            <Image source={require('./../../assets/images/login-page.png')}
                                style={{
                                    width: '100%',
                                    height: 240,
                                    objectFit: 'contain',
                                    borderRadius: 15
                                }}
                            />
                            <View style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    fontFamily: 'outfit-medium',
                                    fontSize: 20
                                }}>{trip?.tripPlan.destination}</Text>
                                <Text>
                                    {moment()}
                                </Text>
                            </View>
                        </View>
                    )}>
                </FlatList>

            </View>
        </View>
    )
}