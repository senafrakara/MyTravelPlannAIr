import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors';
import { SelectTravelesList } from './../../constants/OptionsList';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {

    const navigation = useNavigation();
    const [selectedTraveler, setSelectedTraveler] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Who's Going? "
        })
    }, [navigation]);

    useEffect(() => {
        setTripData({
            ...tripData,
            traveler: selectedTraveler
        })
    }, [selectedTraveler]);

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: 'outfit-bold',
                marginTop: 20
            }}>Who's Going?</Text>

            <View style={{
                marginTop: 20,
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 23
                }}>Choose your travelers</Text>

                <FlatList
                    data={SelectTravelesList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedTraveler(item)}
                            style={{
                                marginVertical: 10
                            }}>
                            <OptionCard option={item} selectedTraveler={selectedTraveler} />
                        </TouchableOpacity>
                    )}
                />

            </View>

            <TouchableOpacity style={{
                padding: 20,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 15,
                marginTop: 15
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontSize: 20,
                    fontFamily: 'outfit-regular'
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}