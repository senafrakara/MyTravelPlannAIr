import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import TripItemCard from './TripItemCard';

export default function UserTripList({ userTrips }) {


    const renderItem = ({ item }) => {
        return <TripItemCard item={item} />;
    };

    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                <FlatList
                    data={userTrips}
                    keyExtractor={item => item.docId}
                    renderItem={renderItem}
                />
            </View>
        </View >
    )
}

