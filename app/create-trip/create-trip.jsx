import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/OptionsList';
import { chatSession } from '../../configs/AiModal';
import { auth, db } from './../../configs/FbConf';
import { doc, setDoc } from "firebase/firestore";


export default function CreateTrip() {
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;


    useEffect(() => {
        GenerateAiTrip()
    }, []);

    const insertTrip = async (docId, createTripResponse) => {
        try {
            const result_ = await setDoc(doc(db, "UserTrips", docId), {
                userEmail: user.email,
                tripPlan: JSON.stringify(createTripResponse),
                tripData: JSON.stringify(tripData),
                docId: docId
            });
            router.push('(tabs)/myTrip');
            console.log("🚀 ~ result_:", result_)

        } catch (error) {
            console.log("🚀 ~ insertTrip ~ error:", error)
            // Show message on screen
        }
    }

    const GenerateAiTrip = async () => {
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', tripData?.locationInfo?.name)
            .replace('{totalNumberOfDays}', tripData?.totalNumberOfDays)
            .replace('{totalNumberOfNights}', tripData?.totalNumberOfNights ?? tripData?.totalNumberOfDays - 1)
            .replace('{traveler}', tripData?.traveler?.title)
            .replace('{budget}', tripData?.budget)
            .replace('{totalNumberOfDays}', tripData?.totalNumberOfDays)
            .replace('{totalNumberOfNights}', tripData?.totalNumberOfNights ?? tripData?.totalNumberOfDays - 1);

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        const response = result.response.text();
        console.log("🚀 ~ GenerateAiTrip ~ response:", response)
        const createTripResponse = JSON.parse(response);

        setLoading(false);

        const docId = (Date.now()).toString();
        insertTrip(docId, createTripResponse);
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Generate Trip'
        })
    }, [navigation]);

    return (
        <View style={{
            paddingTop: 95,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <View style={{
                padding: 25
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35,
                    textAlign: 'center'
                }}>
                    Please Wait...
                </Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: 40
                }}>
                    We are working to generate your dream trip.
                </Text>
            </View>


            <Image
                source={require('./../../assets/images/plane.gif')}
                style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain'
                }} />

            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 20,
                textAlign: 'center',
                marginTop: 30
            }}>Do not Go Back</Text>
        </View>
    )
}