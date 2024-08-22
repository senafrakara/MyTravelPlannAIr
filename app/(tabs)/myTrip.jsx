import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, query, where, getDocs, doc, orderBy } from "firebase/firestore";
import { auth, db } from '../../configs/FbConf';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router'

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        GetUserAllTripPlans();
    }, []);

    const GetUserAllTripPlans = async () => {
        setLoading(true);
        const trips = [];

        try {
            const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const docId = data.docId;
                setUserTrips(oldArray => [data, ...oldArray]);

            });
            console.log("🚀 ~ GetUserAllTripPlans ~ userTrips:", userTrips)
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

            }}
                onPress={() => router.push('/create-trip/search-place')}
            >
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