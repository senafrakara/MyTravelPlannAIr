import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import TripItemCard from './TripItemCard';

export default function UserTripList({ userTrips }) {


    const renderItem = ({ item }) => {
        const docId = item.docId.docId;
        const tripPlan = JSON.parse(item.docId.tripPlan);
        const tripData = JSON.parse(item.docId.tripData);
        const userEmail = item.docId.userEmail;

        item = { "docId": docId, "tripPlan": tripPlan, "tripData": tripData, "userEmail": userEmail };

        return <TripItemCard item={item} />;
    };

    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                <FlatList
                    data={userTrips}
                    keyExtractor={item => item.docId.docId}
                    renderItem={renderItem}
                />
            </View>
        </View >
    )
}

