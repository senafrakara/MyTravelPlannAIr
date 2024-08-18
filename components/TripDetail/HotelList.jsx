import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import HotelCard from './HotelCard'

export default function HotelList({ hotelList }) {
    console.log("🚀 ~ HotelList ~ hotelList:", hotelList)

    return hotelList && (
        <View style={{
            marginTop: 20,
            gap: 10,
            borderWidth: 3,
            borderColor: Colors.LIGHT_GRAY,
            padding: 10,
            borderRadius: 15
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>🏨Hotel Recommendation</Text>

            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ marginTop: 8, }}
                data={hotelList}
                renderItem={({ item, index }) => (
                    <HotelCard item={item} />
                )
                }
            />
        </View >
    )
}