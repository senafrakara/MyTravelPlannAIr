import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from "./../../context/CreateTripContext"

export default function SearchPlace() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        console.log("🚀 ~ SearchPlace ~ tripData:", tripData)
    }, [tripData]);

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

            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setTripData({
                        locationInfo: {
                            name: data.description,
                            coordinates: details?.geometry.location,
                            photoRef: details?.photos[0]?.photo_reference,
                            url: details?.url
                        }
                    });

                    router.push('/create-trip/select-traveler');
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        borderWidth: 1,
                        borderRadius: 15,
                        padding: 5,
                        marginTop: 25
                    }

                }}
            />


        </View>
    )
}