import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import TripItemCard from './TripItemCard';

export default function UserTripList({ userTrips }) {

    const renderItem = ({ item }) => {
        console.log("🚀 ~ renderItem ~ item:", item)
        const docId = item.docId;
        const tripPlan = JSON.parse(item.tripPlan);
        const tripData = JSON.parse(item.tripData);
        const userEmail = item.userEmail;

        item = { "docId": docId, "tripPlan": tripPlan, "tripData": tripData, "userEmail": userEmail };

        return <TripItemCard item={item} />;
    };

    return (userTrips &&
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

