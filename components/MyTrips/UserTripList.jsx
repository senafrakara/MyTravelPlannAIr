import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import TripItemCard from './TripItemCard';

export default function UserTripList({ userTrips }) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const updatedTrips = userTrips.map(trip => ({
            ...trip,
            tripData: JSON.parse(trip.tripData),
            tripPlan: JSON.parse(trip.tripPlan)
        }));

        setTrips(updatedTrips);
    }, [userTrips]);

    const renderItem = ({ item }) => {
        return <TripItemCard item={item} />;
    };

    return (
        <View>
            <View style={{
                marginTop: 20
            }}>
                <FlatList
                    data={trips}
                    keyExtractor={item => item.docId}
                    renderItem={renderItem}
                />
            </View>
        </View >
    )
}

