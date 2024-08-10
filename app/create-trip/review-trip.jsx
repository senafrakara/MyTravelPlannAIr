import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from "moment";

export default function ReviewTrip() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search Place'
        })
    }, [navigation]);

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: 'outfit-bold',
                marginTop: 20
            }}>ReviewTrip</Text>

            <View style={{
                marginTop: 25
            }}>
                <Text sytle={{
                    fontFamily: 'outfit-bold',
                    fontSize: 25
                }}>Before generating your trip, please review your selections.</Text>

                {/* Destination Info */}
                <View style={{
                    marginTop: 40,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                }}>
                    <Text style={{
                        fontSize: 30
                    }}>📍</Text>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit-regular',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Destination</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{tripData?.locationInfo?.name}</Text>
                    </View>
                </View>

                {/* Date Selection Info */}
                <View style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                }}>
                    <Text style={{
                        fontSize: 30
                    }}>📆</Text>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit-regular',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Travel Date</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{moment(tripData?.startDate).format('DD MMM')} - {moment(tripData?.endDate).format('DD MMM')}
                            ({tripData?.totalNumberOfDays} days)</Text>
                    </View>
                </View>

                {/* Traveles Info */}
                <View style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                }}>
                    <Text style={{
                        fontSize: 30
                    }}>🚌</Text>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit-regular',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Traveles</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{tripData?.traveler?.title}</Text>
                    </View>
                </View>

                {/* Butget Info */}
                <View style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                }}>
                    <Text style={{
                        fontSize: 30
                    }}>💰</Text>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit-regular',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Budget</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20
                        }}>{tripData?.budget}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    // onPress={onDateSelectionContinue}
                    style={{
                        padding: 20,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 15,
                        marginTop: 80
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        color: Colors.WHITE,
                        fontSize: 20,
                        fontFamily: 'outfit-regular'
                    }}>Generate My Trip</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}