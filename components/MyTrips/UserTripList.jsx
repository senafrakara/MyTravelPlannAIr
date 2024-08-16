import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import TripItemCard from './TripItemCard';
import moment from 'moment/moment';
import { Colors } from '../../constants/Colors';

const UserTripList = React.memo(function UserTripList({ userTrips }) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const updatedTrips = userTrips.map(trip => ({
            ...trip,
            tripData: JSON.parse(trip.tripData),
            tripPlan: JSON.parse(trip.tripPlan)
        }));

        setTrips(updatedTrips);
    }, [userTrips]);

    const renderTripItem = ({ item }) => (
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
    );

    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                <FlatList
                    data={trips}
                    keyExtractor={item => item.docId}
                    renderItem={renderTripItem}
                />


            </View>
        </View >
    )
});

export { UserTripList };