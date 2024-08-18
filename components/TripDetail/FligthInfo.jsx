import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function FligthInfo({ flightData }) {
    console.log("🚀 ~ FligthInfo ~ flightData:", flightData)
    const onPressBooking = () => Linking.canOpenURL(flightData?.bookingUrl).then(() => {
        Linking.openURL(flightData?.bookingUrl);
    });

    return flightData && (
        <View style={{
            marginTop: 20,
            gap: 10,
            borderWidth: 3,
            borderColor: Colors.LIGHT_GRAY,
            padding: 10,
            borderRadius: 15
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20
                }}>✈️ Flights</Text>

                <TouchableOpacity style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 5,
                    borderRadius: 7,
                    width: 100,
                }}
                    onPress={onPressBooking}>
                    <Text style={{
                        textAlign: 'center',
                        color: Colors.WHITE,
                        fontSize: 15
                    }}>Book Here</Text>
                </TouchableOpacity>
            </View>

            <View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 2
                }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontSize: 15,
                        fontFamily: 'outfit-bold'
                    }}>Departure Airport:</Text>
                    <Text>
                        {flightData?.departureAirport}
                    </Text>
                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 2
                }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontSize: 15,
                        fontFamily: 'outfit-bold'
                    }}>Arrival Airport:</Text>
                    <Text>
                        {flightData?.arrivalAirport}
                    </Text>
                </View>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 2
                }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontSize: 15,
                        fontFamily: 'outfit-bold'
                    }}>Price:</Text>
                    <Text>
                        {flightData?.flightPrice}
                    </Text>
                </View>
            </View>

        </View>
    )
}