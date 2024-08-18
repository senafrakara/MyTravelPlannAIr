import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment/moment';
import FligthInfo from '../../components/TripDetail/FligthInfo';
import HotelList from '../../components/TripDetail/HotelList';
import TripDailyItinerary from '../../components/TripDetail/TripDailyItinerary';
import Constants from 'expo-constants'

export default function TripDetail() {
    const { trip } = useLocalSearchParams();
    const [tripDetail, setTripDetail] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
        setTripDetail(JSON.parse(trip));

    }, []);

    return tripDetail && (
        <ScrollView>

            <Image source={{
                uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + tripDetail.tripData.locationInfo.photoRef +
                    "&key=" + Constants?.expoConfig?.extra?.GOOGLE_MAPS_API_KEY
            }}
                style={{
                    width: '100%',
                    height: 250,
                }}
            />
            <View style={{
                padding: 15,
                backgroundColor: Colors.WHITE,
                height: '100%',
                marginTop: -30,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}>
                <Text style={{
                    fontSize: 25,
                    fontFamily: 'outfit-bold'
                }}>
                    {tripDetail?.tripPlan?.destination}
                </Text>
                <View style={{
                    gap: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>

                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'outfit-regular',
                        color: Colors.GRAY
                    }}>
                        {moment(tripDetail?.tripData.startDate).format('DD MMM yyyy')}/
                        {moment(tripDetail?.tripData.endDate).format('DD MMM yyyy')}

                    </Text>

                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'outfit-regular',
                        color: Colors.GRAY
                    }}>
                        🚌 {tripDetail?.tripData.traveler.title}
                    </Text>
                </View>


                {/* Flight Info  */}
                <FligthInfo flightData={tripDetail?.tripPlan?.flightDetails} />

                {/* Hotels List  */}
                <HotelList hotelList={tripDetail?.tripPlan?.hotels} />

                {/*  Trip Day Planner Info */}
                <TripDailyItinerary details={tripDetail?.tripPlan?.dailyItinerary} />
            </View>


        </ScrollView >
    )
}