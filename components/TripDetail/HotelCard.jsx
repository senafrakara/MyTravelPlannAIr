import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({ item }) {
    const [photoRef, setPhotoRef] = useState();

    useEffect(() => {
        GetGooglePhotoRef();
    }, []);

    const GetGooglePhotoRef = async () => {
        const address = item.name;
        const coordinate1 = item.geoCoordinates[0];
        const coordinate2 = item.geoCoordinates[1];
        const result = await GetPhotoRef({ address, coordinate1, coordinate2 });
        const photoRef = result.results[0].photos[0].photo_reference;
        setPhotoRef(photoRef);
        console.log("🚀 ~ HotelCard ~ photoRef:", photoRef)

    }

    return (
        <View style={{
            marginRight: 15,
            width: 180,
        }}>
            <Image
                source={{
                    uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="
                        + photoRef +
                        "&key=" + process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
                }}
                style={{
                    width: 180,
                    height: 120,
                    borderRadius: 15
                }}>
            </Image>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                }}>{item?.name}</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 13,
                }}>
                    💵{item?.price.replace(' ', '/').replace('per', '')}
                </Text>
            </View>
        </View>
    )
}