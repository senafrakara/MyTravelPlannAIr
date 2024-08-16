import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from './../../configs/FirebaseConfig';
import { UserTripList } from '../../components/MyTrips/UserTripList';

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GetUserAllTripPlans();
    }, [user]);


    const GetUserAllTripPlans = async () => {
        setLoading(true);

        try {
            const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setUserTrips(prev => [...prev, data]);
            });
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }

    }

    return (
        <View style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <TouchableOpacity style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between'

            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35
                }}>My Trips</Text>
                <Ionicons name="add-circle" size={50} color="black" />
            </TouchableOpacity>

            {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}

            {userTrips?.length == 0 ?
                <StartNewTripCard />
                :
                <UserTripList userTrips={userTrips} />}
        </View>
    )
}